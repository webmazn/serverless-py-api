import "reflect-metadata";
import { container } from "tsyringe";
import { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import StarWarsProvider from "../../../src/provider/star-wars/star-wars.provider";
import ApiConnectorUtil from "../../../src/utils/apiConnectorUtil";
import TYPES from "../../../src/types";
import { Person } from "../../../src/provider/star-wars/interfaces/star-wars.interface";

jest.mock("ts-log-debug", () => ({
	$log: {
		info: jest.fn(),
		debug: jest.fn(),
		error: jest.fn(),
	},
}));

describe("StarWarsProvider", () => {
	let starWarsProvider: StarWarsProvider;
	let apiConnectorMock: jest.Mocked<ApiConnectorUtil>;

	beforeEach(() => {
		apiConnectorMock = {
			get: jest.fn(),
		} as any;
		container.register(TYPES.StarWarsConnector, { useValue: apiConnectorMock });
		starWarsProvider = container.resolve(StarWarsProvider);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should fetch person by ID and return person data", async () => {
		const id = 1;
		const mockPerson: Person = {
			"name": "Maycol Zambrano",
			"height": "186",
			"mass": "99",
			"hair_color": "negro",
			"skin_color": "claro",
			"eye_color": "marrones",
			"birth_year": "19BBY",
			"gender": "masculino",
			"homeworld": "Earth",
			"films": [],
			"species": [],
			"vehicles": [],
			"starships": [],
			"created": "string",
			"edited": "string",
			"url": "string",
		};
		const mockResponse: AxiosResponse<Person> = {
			data: mockPerson,
			status: 200,
			statusText: "OK",
			headers: { "Content-Type": "application/json" },
			config: {
				headers: new AxiosHeaders({
					"Authorization": "Bearer token",
				}),
			},
			request: {} as any,
		};
		apiConnectorMock.get.mockResolvedValue(mockResponse);
		const result = await starWarsProvider.findByIdSWAPI(id);
		expect(apiConnectorMock.get).toHaveBeenCalledWith(`${process.env.API_SWAPI_URL}/${id}`);
		expect(result).toEqual(mockPerson);
	});

	it("Should log an error and return null if the API call fails", async () => {
		const id = 1;
		const mockError = new AxiosError("Not Found");
		apiConnectorMock.get.mockRejectedValue(mockError);
		const result = await starWarsProvider.findByIdSWAPI(id);
		expect(apiConnectorMock.get).toHaveBeenCalledWith(`${process.env.API_SWAPI_URL}/${id}`);
		expect(result).toBeNull();
	});

	it("Should return null if an unexpected error occurs", async () => {
		const id = 1;
		const mockError = new Error("Unexpected Error");
		apiConnectorMock.get.mockRejectedValue(mockError);
		const result = await starWarsProvider.findByIdSWAPI(id);
		expect(apiConnectorMock.get).toHaveBeenCalledWith(`${process.env.API_SWAPI_URL}/${id}`);
		expect(result).toBeNull();
	});
});
