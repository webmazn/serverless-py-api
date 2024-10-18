import axios, { AxiosStatic, AxiosResponse } from "axios";
import ApiConnectorUtil from "../../../src/utils/apiConnectorUtil";
import { HEADERS_KEY, HEADERS_VALUE } from "../../../src/common/constants";

jest.mock("axios");

describe("ApiConnectorUtil", () => {
	const host = "https://api.example.com";
	const config = { host };
	let apiConnector: ApiConnectorUtil;

	const mockedAxios = axios as jest.Mocked<AxiosStatic>;

	beforeEach(() => {
		mockedAxios.create.mockReturnValue(mockedAxios);
		mockedAxios.get = jest.fn();
		mockedAxios.post = jest.fn();
		mockedAxios.put = jest.fn();
		mockedAxios.patch = jest.fn();
		mockedAxios.delete = jest.fn();

		apiConnector = new ApiConnectorUtil(config);
		jest.clearAllMocks();
	});

	it("Should create an axios instance with the correct baseURL and headers", () => {
		expect(apiConnector).toBeDefined();
	});

	it("Should get method should call axios.get with correct parameters", async () => {
		const path = "/resource";
		const headers = { Authorization: "Bearer token" };
		const params = { key: "value" };
		const mockedResponse: AxiosResponse = { data: { result: "success" } } as AxiosResponse;

		mockedAxios.get.mockResolvedValue(mockedResponse);

		const response = await apiConnector.get(path, headers, params);

		expect(mockedAxios.get).toHaveBeenCalledWith(path, { headers, params });
		expect(response).toEqual(mockedResponse);
	});

	it("Should post method should call axios.post with correct parameters", async () => {
		const path = "/resource";
		const payload = { data: "payload" };
		const headers = { Authorization: "Bearer token" };
		const mockedResponse: AxiosResponse = { data: { result: "success" } } as AxiosResponse;

		mockedAxios.post.mockResolvedValue(mockedResponse);

		const response = await apiConnector.post(path, payload, headers);

		expect(mockedAxios.post).toHaveBeenCalledWith(path, payload, { headers });
		expect(response).toEqual(mockedResponse);
	});

	it("Should put method should call axios.put with correct parameters", async () => {
		const path = "/resource";
		const payload = { data: "payload" };
		const headers = { Authorization: "Bearer token" };
		const mockedResponse: AxiosResponse = { data: { result: "success" } } as AxiosResponse;

		mockedAxios.put.mockResolvedValue(mockedResponse);

		const response = await apiConnector.put(path, payload, headers);

		expect(mockedAxios.put).toHaveBeenCalledWith(path, payload, { headers });
		expect(response).toEqual(mockedResponse);
	});

	it("Should patch method should call axios.patch with correct parameters", async () => {
		const path = "/resource";
		const payload = { data: "payload" };
		const headers = { Authorization: "Bearer token" };
		const mockedResponse: AxiosResponse = { data: { result: "success" } } as AxiosResponse;

		mockedAxios.patch.mockResolvedValue(mockedResponse);

		const response = await apiConnector.patch(path, payload, headers);

		expect(mockedAxios.patch).toHaveBeenCalledWith(path, payload, { headers });
		expect(response).toEqual(mockedResponse);
	});

	it("Should delete method should call axios.delete with correct parameters", async () => {
		const path = "/resource";
		const headers = { Authorization: "Bearer token" };
		const mockedResponse: AxiosResponse = { data: { result: "success" } } as AxiosResponse;

		mockedAxios.delete.mockResolvedValue(mockedResponse);

		const response = await apiConnector.delete(path, headers);

		expect(mockedAxios.delete).toHaveBeenCalledWith(path, { headers });
		expect(response).toEqual(mockedResponse);
	});
});
