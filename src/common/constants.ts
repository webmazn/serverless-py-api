export const NUMBERREGEX = /^[0-9]+$/;
export const QUOTESREGEX = /"/g;
export const QUOTES = "'";

export const ERROR_MESSAGES = {
	ERROR_METHOD_POST: "createHandler only accept POST method, you tried:",
	ERROR_METHOD_FIND: "findHandler only accept GET method, you tried:",
	ERROR_METHOD_FIND_ALL: "findaAllHandler only accept GET method, you tried:",
	ERROR_ROUTE_NOT_FOUND: "Route Not Found",
	DEFAULT: "error",
};

export const GENERIC_MESSAGES = {
	EXISTS_INTANCE_DYNAMO: "Existent DynamoDBDocumentClient",
	NEW_CLIENT_FROM_CREDENTIALS: "New DynamoDB client through credentials",
	NEW_CLIENT_DYNAMO: "New DynamoDB client",
	INITIALIZED_CLIENT_DYNAMO: "Initialized DynamoDBDocumentClient",
};

export const ERROR_MESSAGE_HTTP = {
	INTERNAL_SERVER: "Internal server error",
	NOT_FOUND: "Not found",
	CONFLICT: "Conflict",
	UNSUPPORTED_MEDIA_TYPE: "Unsupported media type",
	UNPROCESABLE_ENTITY: "Unprocessable entity",
	FAILED_DEPENDENCY: "Failed dependency",
};

export const HEADERS_KEY = {
	AUTHORIZATION: "Authorization",
	CONTENT_TYPE: "Content-Type",
};

export const HEADERS_VALUE = {
	BEARER: "Bearer",
	APPLICATION_EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	CONTENT_DISPOSITION: "Content-Disposition",
	ATTACHMENT: (fileName: string): string => `attachment; filename=${fileName}`,
	APPLICATION_JSON: "application/json",
	APPLICATION_X_WWW_FORM_URLENCODED: "application/x-www-form-urlencoded",
};
