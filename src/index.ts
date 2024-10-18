import "reflect-metadata";
import { APIGatewayEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import container from "./container";
import TYPES from "./types";
import { HTTP, HTTP_METHOD } from "./common/enums";
import { ERROR_MESSAGES } from "./common/constants";
import PersonHandler from "./api/person/handler/person.handler";

const personHandler = container.resolve<PersonHandler>(TYPES.PersonHandler);

export const createHandler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
	if (event.httpMethod !== HTTP_METHOD.POST) throw new Error(`${ERROR_MESSAGES.ERROR_METHOD_POST} ${event.httpMethod}`);
	return personHandler.create(event);
};

export const findHandler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
	if (event.httpMethod !== HTTP_METHOD.GET) throw new Error(`${ERROR_MESSAGES.ERROR_METHOD_FIND} ${event.httpMethod}`);
	return personHandler.find(event);
};

export const findAllHandler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
	if (event.httpMethod !== HTTP_METHOD.GET)
		throw new Error(`${ERROR_MESSAGES.ERROR_METHOD_FIND_ALL} ${event.httpMethod}`);
	return personHandler.findAll(event);
};

export const routeNotFoundHandler: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => ({
	statusCode: HTTP.STATUS_404,
	body: JSON.stringify({
		message: ERROR_MESSAGES.ERROR_ROUTE_NOT_FOUND,
		path: event.path,
	}),
});
