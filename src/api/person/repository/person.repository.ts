import { inject, injectable } from "tsyringe";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { $log } from "ts-log-debug";
import { CreateRequest, CreateResponse, IPersonRepository } from "../interfaces/person.interfaces";
import { METHOD, REPOSITORY } from "../../../common/enums";
import TYPES from "../../../types";
import { ScanCommand } from "@aws-sdk/client-dynamodb";

@injectable()
export default class PersonRepository implements IPersonRepository {
	constructor(@inject(TYPES.DynamoDBClient) private dynameDB: DynamoDBDocumentClient) {}

	public async create(request: CreateRequest): Promise<CreateResponse> {
		$log.info(`${REPOSITORY.PERSON} ${METHOD.CREATE}`);
		const params = {
			id: uuidv4(),
			name: request.nombre,
			height: request.altura,
			mass: request.peso,
			hair_color: request.color_cabello,
			skin_color: request.color_piel,
			eye_color: request.color_ojos,
			birth_year: request.fecha_nacimiento,
			gender: request.genero,
			homeworld: request.planeta_natal,
		};
		$log.debug(`${REPOSITORY.PERSON} ${METHOD.CREATE}`, JSON.stringify(params));
		const createdPerson = await this.dynameDB.send(
			new PutCommand({
				TableName: process.env.TABLE_NAME_DB,
				Item: params,
			})
		);
		$log.debug(`${REPOSITORY.PERSON} ${METHOD.CREATE}`, JSON.stringify(createdPerson));
		return params;
	}

	public async find(id: string): Promise<CreateResponse | null> {
		$log.info(`${REPOSITORY.PERSON} ${METHOD.FIND}`);
		const result = await this.dynameDB.send(
			new GetCommand({
				TableName: process.env.TABLE_NAME_DB,
				Key: {
					id,
				},
			})
		);
		if (!result) {
			return null;
		}
		return result.Item as CreateResponse;
	}

	public async findAll(): Promise<CreateResponse[]> {
		$log.info(`${REPOSITORY.PERSON} ${METHOD.FIND_ALL}`);
		const command = new ScanCommand({
			TableName: process.env.TABLE_NAME_DB,
		});
		const result = await this.dynameDB.send(command);
		$log.debug(`${REPOSITORY.PERSON} ${METHOD.FIND_ALL}`, JSON.stringify(result.Items));
		const items =
			result.Items?.map((item) => {
				return {
					id: item.id.S,
					name: item.name.S,
					height: item.height.N,
					mass: item.mass.N,
					hair_color: item.hair_color.S,
					skin_color: item.skin_color.S,
					eye_color: item.eye_color.S,
					birth_year: item.birth_year.S,
					gender: item.gender.S,
					homeworld: item.homeworld.S,
				} as CreateResponse;
			}) || [];
		return items;
	}
}
