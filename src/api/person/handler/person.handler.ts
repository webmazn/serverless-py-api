import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { inject, injectable } from "tsyringe";
import { $log } from "ts-log-debug";
import TYPES from "../../../types";
import PersonService from "../service/person.service";
import { HANDLER, HTTP, METHOD } from "../../../common/enums";
import { CreateRequest } from "../interfaces/person.interfaces";
import { createPersonValidation, findByIdValidation } from "../validations/person.validations";
import errorHandler from "../../../utils/response-handler";

@injectable()
export default class PersonHandler {
	constructor(@inject(TYPES.PersonService) private personService: PersonService) {}

	async create(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
		$log.info(`${HANDLER.PERSON} ${METHOD.CREATE}`);
		try {
			const body: CreateRequest | undefined = event.body ? JSON.parse(event.body) : undefined;
			await createPersonValidation.validateAsync(body);
			const createdPerson = await this.personService.create(body!);
			return {
				statusCode: HTTP.STATUS_201,
				body: JSON.stringify(createdPerson),
			};
		} catch (e) {
			$log.error(JSON.stringify(e));
			return errorHandler(e);
		}
	}

	async find(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
		$log.info(`${HANDLER.PERSON} ${METHOD.FIND}`);
		try {
			const id = event.pathParameters?.id;
			await findByIdValidation.validateAsync(id);
			const person = await this.personService.find(id!);
			return {
				statusCode: HTTP.STATUS_200,
				body: JSON.stringify(person),
			};
		} catch (e) {
			$log.error(JSON.stringify(e));
			return errorHandler(e);
		}
	}

	async findAll(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
		$log.info(`${HANDLER.PERSON} ${METHOD.FIND_ALL}`);
		try {
			const person = await this.personService.findAll();
			return {
				statusCode: HTTP.STATUS_200,
				body: JSON.stringify(person),
			};
		} catch (e) {
			$log.error(JSON.stringify(e));
			return errorHandler(e);
		}
	}
}
