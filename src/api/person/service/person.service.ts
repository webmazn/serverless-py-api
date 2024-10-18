import { inject, injectable } from "tsyringe";
import { $log } from "ts-log-debug";
import TYPES from "../../../types";
import { METHOD, SERVICE } from "../../../common/enums";
import { NUMBERREGEX } from "../../../common/constants";
import StarWarsProvider from "../../../provider/star-wars/star-wars.provider";
import { CreateRequest, CreateResponse, IPersonService } from "../interfaces/person.interfaces";
import PersonRepository from "../repository/person.repository";
import { NotFoundException } from "../../../common/errors";
import { personMapperResponse } from "../mapper/person.mapper";

@injectable()
export default class PersonService implements IPersonService {
	constructor(
		@inject(TYPES.PersonRepository) private personRepository: PersonRepository,
		@inject(TYPES.StarWarsProvider) private starWarsProvider: StarWarsProvider
	) {}

	public async create(request: CreateRequest): Promise<CreateResponse> {
		$log.info(`${SERVICE.PERSON} ${METHOD.CREATE}`);
		const createdPerson = await this.personRepository.create(request);
		return createdPerson;
	}

	public async find(id: string): Promise<CreateRequest> {
		$log.info(`${SERVICE.PERSON} ${METHOD.FIND}`);
		const person = NUMBERREGEX.test(id)
			? await this.starWarsProvider.findByIdSWAPI(+id)
			: await this.personRepository.find(id);
		if (!person) throw new NotFoundException();
		return personMapperResponse(person);
	}

	public async findAll(): Promise<CreateRequest[]> {
		$log.info(`${SERVICE.PERSON} ${METHOD.FIND_ALL}`);
		const people = await this.personRepository.findAll();
		return people.map(personMapperResponse);
	}
}
