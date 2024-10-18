import "reflect-metadata";
import { container } from "tsyringe";
import { APIGatewayEvent } from "aws-lambda";
import PersonHandler from "../../../../src/api/person/handler/person.handler";
import PersonService from "../../../../src/api/person/service/person.service";
import { HTTP } from "../../../../src/common/enums";
import errorHandler from "../../../../src/utils/response-handler";
import * as Joi from "joi";
import { CreateRequest } from "../../../../src/api/person/interfaces/person.interfaces";

jest.mock("../../../../src/api/person/service/person.service");
jest.mock("../../../../src/utils/response-handler");

describe("PersonHandler", () => {
	let personHandler: PersonHandler;
	let personService: PersonService;

	beforeEach(() => {
		personService = container.resolve(PersonService);
		personHandler = new PersonHandler(personService);
	});

	describe("Should create person", () => {
		it("Should create a person successfully", async () => {
			const requestBody: CreateRequest = {
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
			const event: APIGatewayEvent = {
				body: JSON.stringify(requestBody),
				pathParameters: null,
			} as any;
			(personService.create as jest.Mock).mockResolvedValue(requestBody);
			const result = await personHandler.create(event);
			expect(result).toEqual({
				statusCode: HTTP.STATUS_201,
				body: JSON.stringify(requestBody),
			});
			expect(personService.create).toHaveBeenCalledWith(requestBody);
		});

		it("Should handle validation errors", async () => {
			const event: APIGatewayEvent = {
				body: JSON.stringify({}),
				pathParameters: null,
			} as any;
			Joi.ValidationError.prototype.isJoi = true;
			(errorHandler as jest.Mock).mockReturnValue({ statusCode: 400, body: "Validation Error" });
			const result = await personHandler.create(event);
			expect(result).toEqual({ statusCode: 400, body: "Validation Error" });
			expect(personService.create).not.toHaveBeenCalled();
		});

		it("Should handle service errors", async () => {
			const event: APIGatewayEvent = {
				body: JSON.stringify({}),
				pathParameters: null,
			} as any;
			(personService.create as jest.Mock).mockRejectedValue(new Error("Service error"));
			(errorHandler as jest.Mock).mockReturnValue({ statusCode: 500, body: "Internal Server Error" });
			const result = await personHandler.create(event);
			expect(result).toEqual({ statusCode: 500, body: "Internal Server Error" });
		});
	});

	describe("Should find person by id", () => {
		it("Should find a person by ID successfully", async () => {
			const event: APIGatewayEvent = {
				pathParameters: { id: "1" },
				body: null,
			} as any;
			const personData = { id: "1", name: "Luke Skywalker" };
			(personService.find as jest.Mock).mockResolvedValue(personData);
			const result = await personHandler.find(event);
			expect(result).toEqual({
				statusCode: HTTP.STATUS_200,
				body: JSON.stringify(personData),
			});
			expect(personService.find).toHaveBeenCalledWith("1");
		});

		it("Should handle not found errors", async () => {
			const event: APIGatewayEvent = {
				pathParameters: { id: "non-existent-id" },
				body: null,
			} as any;
			(personService.find as jest.Mock).mockRejectedValue(new Error("Not Found"));
			(errorHandler as jest.Mock).mockReturnValue({ statusCode: 404, body: "Not Found" });
			const result = await personHandler.find(event);
			expect(result).toEqual({ statusCode: 404, body: "Not Found" });
		});

		it("Should handle service errors", async () => {
			const event: APIGatewayEvent = {
				pathParameters: { id: "1" },
				body: null,
			} as any;
			(personService.find as jest.Mock).mockRejectedValue(new Error("Service error"));
			(errorHandler as jest.Mock).mockReturnValue({ statusCode: 500, body: "Internal Server Error" });
			const result = await personHandler.find(event);
			expect(result).toEqual({ statusCode: 500, body: "Internal Server Error" });
		});
	});

	describe("Should findAll persons", () => {
		it("Should find all people successfully", async () => {
			const event: APIGatewayEvent = {
				body: null,
				pathParameters: null,
			} as any;
			const peopleData = [{ id: "1", name: "Luke Skywalker" }];
			(personService.findAll as jest.Mock).mockResolvedValue(peopleData);
			const result = await personHandler.findAll(event);
			expect(result).toEqual({
				statusCode: HTTP.STATUS_200,
				body: JSON.stringify(peopleData),
			});
			expect(personService.findAll).toHaveBeenCalled();
		});

		it("Should handle service errors", async () => {
			const event: APIGatewayEvent = {
				body: null,
				pathParameters: null,
			} as any;
			(personService.findAll as jest.Mock).mockRejectedValue(new Error("Service error"));
			(errorHandler as jest.Mock).mockReturnValue({ statusCode: 500, body: "Internal Server Error" });
			const result = await personHandler.findAll(event);
			expect(result).toEqual({ statusCode: 500, body: "Internal Server Error" });
		});
	});
});
