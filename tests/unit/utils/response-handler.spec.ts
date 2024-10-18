import errorHandler from "../../../src/utils/response-handler";
import { ERROR_MESSAGES } from "../../../src/common/constants";

jest.mock("joi", () => ({
	isError: jest.fn() as jest.Mock,
}));

jest.mock("../../../src/common/errors", () => ({
	HttpException: jest.fn().mockImplementation((message: string, statusCode: number) => ({
		message,
		statusCode,
	})),
	InternalServerErrorException: jest.fn().mockImplementation(() => ({
		statusCode: 500,
		message: "Internal Server Error",
	})),
}));

describe("errorHandler", () => {
	it("should return 500 status code for unknown errors", () => {
		const mockError = new Error("Some unexpected error");
		const result = errorHandler(mockError);
		expect(result).toEqual({
			statusCode: 500,
			body: JSON.stringify({
				status: ERROR_MESSAGES.DEFAULT,
				message: {
					status: ERROR_MESSAGES.DEFAULT,
					message: "Internal Server Error",
				},
			}),
		});
	});
});
