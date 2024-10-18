import "reflect-metadata";
import { container } from "tsyringe";
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import PersonRepository from "../../../../src/api/person/repository/person.repository";
import { CreateRequest, CreateResponse } from "../../../../src/api/person/interfaces/person.interfaces";
import { v4 as uuidv4 } from "uuid";

const mockDynamoDBClient = {
	send: jest.fn(),
};

describe("PersonRepository", () => {
	let personRepository: PersonRepository;

	beforeEach(() => {
		personRepository = new PersonRepository(mockDynamoDBClient as unknown as DynamoDBDocumentClient);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	process.env.TABLE_NAME_DB = "TestTable";
	describe("Should create person", () => {
		it("Should create a person successfully", async () => {
			const request: CreateRequest = {
				nombre: "Luke Skywalker",
				altura: "172",
				peso: "77",
				color_cabello: "blond",
				color_piel: "fair",
				color_ojos: "blue",
				fecha_nacimiento: "19BBY",
				genero: "male",
				planeta_natal: "Tatooine",
			};
			const params = {
				id: expect.any(String),
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
			mockDynamoDBClient.send.mockResolvedValue({});
			const result = await personRepository.create(request);
			expect(result).toEqual(expect.objectContaining(params));
		});

		it("Should handle errors during creation", async () => {
			const request: CreateRequest = {
				nombre: "Luke Skywalker",
				altura: "172",
				peso: "77",
				color_cabello: "blond",
				color_piel: "fair",
				color_ojos: "blue",
				fecha_nacimiento: "19BBY",
				genero: "male",
				planeta_natal: "Tatooine",
			};
			mockDynamoDBClient.send = jest.fn().mockRejectedValue(new Error("Creation failed"));
			await expect(personRepository.create(request)).rejects.toThrow("Creation failed");
		});
	});

	describe("Should find person by id", () => {
		it("Should find a person by ID successfully", async () => {
			const id = "1";
			const expectedResponse: CreateResponse = {
				id,
				name: "Luke Skywalker",
				height: "172",
				mass: "77",
				hair_color: "blond",
				skin_color: "fair",
				eye_color: "blue",
				birth_year: "19BBY",
				gender: "male",
				homeworld: "Tatooine",
			};
			mockDynamoDBClient.send = jest.fn().mockResolvedValue({ Item: expectedResponse });
			const result = await personRepository.find(id);
			expect(result).toEqual(expectedResponse);
		});
		it("Should return null if person is not found", async () => {
			const id = "non-existent-id";
			mockDynamoDBClient.send = jest.fn().mockResolvedValue({ Item: null });
			const result = await personRepository.find(id);
			expect(result).toBeNull();
		});
	});

	describe("Should findAll persons", () => {
		it("Should find all people successfully", async () => {
			const dynamoResponse = {
				Items: [
					{
						id: { S: "1" },
						name: { S: "Luke Skywalker" },
						height: { N: 172 },
						mass: { N: 77 },
						hair_color: { S: "blond" },
						skin_color: { S: "fair" },
						eye_color: { S: "blue" },
						birth_year: { S: "19BBY" },
						gender: { S: "male" },
						homeworld: { S: "Tatooine" },
					},
					{
						id: { S: "2" },
						name: { S: "Luke Skywalker" },
						height: { N: 172 },
						mass: { N: 77 },
						hair_color: { S: "blond" },
						skin_color: { S: "fair" },
						eye_color: { S: "blue" },
						birth_year: { S: "19BBY" },
						gender: { S: "male" },
						homeworld: { S: "Tatooine" },
					},
					{
						id: { S: "3" },
						name: { S: "Luke Skywalker" },
						height: { S: "172" },
						mass: { S: "77" },
						hair_color: { S: "blond" },
						skin_color: { S: "fair" },
						eye_color: { S: "blue" },
						birth_year: { S: "19BBY" },
						gender: { S: "male" },
						homeworld: { S: "Tatooine" },
					},
				],
			};

			mockDynamoDBClient.send = jest.fn().mockResolvedValue(dynamoResponse);
			const result = await personRepository.findAll();
			const expectedResponse = dynamoResponse.Items.map((item) => ({
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
			}));

			expect(result).toEqual(expectedResponse);
		});
	});
});
