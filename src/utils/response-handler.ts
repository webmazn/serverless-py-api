import { APIGatewayProxyResult } from "aws-lambda";
import Joi from "joi";
import { HTTP } from "../common/enums";
import { HttpException, InternalServerErrorException } from "../common/errors";
import cleanDoubleQuotes from "./string-operations";
import { ERROR_MESSAGES } from "../common/constants";

const errorHandler = (e: unknown): APIGatewayProxyResult => {
	if (Joi.isError(e)) {
		return {
			statusCode: HTTP.STATUS_400,
			body: JSON.stringify({ status: ERROR_MESSAGES.DEFAULT, message: cleanDoubleQuotes(e.message) }),
		};
	}

	if (e instanceof HttpException) {
		return {
			statusCode: e.statusCode as HTTP,
			body: JSON.stringify({
				status: ERROR_MESSAGES.DEFAULT,
				message: { status: ERROR_MESSAGES.DEFAULT, message: e.message },
			}),
		};
	}

	const error = new InternalServerErrorException();
	return {
		statusCode: error.statusCode,
		body: JSON.stringify({
			status: ERROR_MESSAGES.DEFAULT,
			message: { status: ERROR_MESSAGES.DEFAULT, message: error.message },
		}),
	};
};

export default errorHandler;
