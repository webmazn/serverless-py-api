import axios, { AxiosInstance, AxiosResponse } from "axios";
import { HEADERS_KEY, HEADERS_VALUE } from "../common/constants";

interface ApiConnectorConfig {
	host: string;
}

export default class ApiConnectorUtil {
	private axiosInstance: AxiosInstance;

	constructor(private readonly config: ApiConnectorConfig) {
		this.axiosInstance = axios.create({
			baseURL: this.config.host,
			headers: {
				[HEADERS_KEY.CONTENT_TYPE]: [HEADERS_VALUE.APPLICATION_JSON],
			},
		});
	}

	async get(path: string, headers?: object, params?: object): Promise<AxiosResponse> {
		return this.axiosInstance.get(path, { headers, params });
	}

	async post(path: string, payload: object, headers: object = {}): Promise<AxiosResponse> {
		return this.axiosInstance.post(path, payload, { headers });
	}

	async put(path: string, payload: object, headers: object = {}): Promise<AxiosResponse> {
		return this.axiosInstance.put(path, payload, { headers });
	}

	async patch(path: string, payload: object, headers: object = {}): Promise<AxiosResponse> {
		return this.axiosInstance.patch(path, payload, { headers });
	}

	async delete(path: string, headers: object = {}): Promise<AxiosResponse> {
		return this.axiosInstance.delete(path, { headers });
	}
}
