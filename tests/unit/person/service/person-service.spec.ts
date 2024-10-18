import "reflect-metadata";
import { container } from "tsyringe";
import { NotFoundException } from "../../../../src/common/errors";
import { CreateRequest, CreateResponse } from "../../../../src/api/person/interfaces/person.interfaces";
import PersonService from "../../../../src/api/person/service/person.service";
import PersonRepository from "../../../../src/api/person/repository/person.repository";
import StarWarsProvider from "../../../../src/provider/star-wars/star-wars.provider";
import { personMapperResponse } from "../../../../src/api/person/mapper/person.mapper";

jest.mock("../../../../src/api/person/repository/person.repository");
jest.mock("../../../../src/provider/star-wars/star-wars.provider");
jest.mock("ts-log-debug", () => ({
	$log: {
		info: jest.fn(),
	},
}));

describe("PersonService", () => {
	let personService: PersonService;
	let personRepository: PersonRepository;
	let starWarsProvider: StarWarsProvider;
	const mockPersonRequest = {
		"altura": "186",
		"color_cabello": "negro",
		"color_ojos": "marrones",
		"color_piel": "claro",
		"nombre": "Maycol Zambrano",
		"fecha_nacimiento": "19BBY",
		"genero": "masculino",
		"peso": "99",
		"planeta_natal": "Earth",
	};
	const mockPersonResponse = {
		"id": "c0745445-9a70-4710-bb28-637b70071896",
		"name": "Maycol Zambrano",
		"height": "186",
		"mass": "99",
		"hair_color": "negro",
		"skin_color": "claro",
		"eye_color": "marrones",
		"birth_year": "19BBY",
		"gender": "masculino",
		"homeworld": "Earth",
	};
	beforeEach(() => {
		personRepository = container.resolve(PersonRepository);
		starWarsProvider = container.resolve(StarWarsProvider);
		personService = new PersonService(personRepository, starWarsProvider);
	});

	describe("Should create person", () => {
		it("Should create a person successfully", async () => {
			const request: CreateRequest = mockPersonRequest;

			const createdPerson: CreateResponse = {
				"id": "c0745445-9a70-4710-bb28-637b70071896",
				"name": "Maycol Zambrano",
				"height": "186",
				"mass": "99",
				"hair_color": "negro",
				"skin_color": "claro",
				"eye_color": "marrones",
				"birth_year": "19BBY",
				"gender": "masculino",
				"homeworld": "Earth",
			};

			(personRepository.create as jest.Mock).mockResolvedValue(createdPerson);

			const result = await personService.create(request);

			expect(personRepository.create).toHaveBeenCalledWith(request);
			expect(result).toEqual(createdPerson);
		});
	});

	describe("Should find person by id", () => {
		it("Should find a person by ID from StarWars API", async () => {
			const id = "1";
			const personData = mockPersonResponse;
			const mappedResponse = personMapperResponse(personData);

			(starWarsProvider.findByIdSWAPI as jest.Mock).mockResolvedValue(personData);

			const result = await personService.find(id);

			expect(starWarsProvider.findByIdSWAPI).toHaveBeenCalledWith(1);
			expect(result).toEqual(mappedResponse);
		});

		it("Should find a person by ID from PersonRepository", async () => {
			const id = "some-id";
			const personData = mockPersonResponse;
			const mappedResponse = personMapperResponse(personData);

			(personRepository.find as jest.Mock).mockResolvedValue(personData);

			const result = await personService.find(id);

			expect(personRepository.find).toHaveBeenCalledWith(id);
			expect(result).toEqual(mappedResponse);
		});

		it("Should throw NotFoundException if person not found", async () => {
			const id = "1";

			(starWarsProvider.findByIdSWAPI as jest.Mock).mockResolvedValue(null);

			await expect(personService.find(id)).rejects.toThrow(NotFoundException);
		});
	});

	describe("Should findAll persons", () => {
		it("Should return all people", async () => {
			const peopleData = [mockPersonResponse];
			const mappedResponses = peopleData.map(personMapperResponse);

			(personRepository.findAll as jest.Mock).mockResolvedValue(peopleData);

			const result = await personService.findAll();

			expect(personRepository.findAll).toHaveBeenCalled();
			expect(result).toEqual(mappedResponses);
		});
	});
});
