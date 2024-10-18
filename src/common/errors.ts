import { ERROR_MESSAGE_HTTP } from "./constants";
import { HTTP } from "./enums";

/* eslint max-classes-per-file: ["error", 20] */
export abstract class HttpException extends Error {
	constructor(public message: string, public statusCode: number) {
		super(message);
	}
}

export class InternalServerErrorException extends HttpException {
	constructor(public message: string = ERROR_MESSAGE_HTTP.INTERNAL_SERVER) {
		super(message, HTTP.STATUS_500);
	}
}

export class BadRequestException extends HttpException {
	constructor(public message: string, public param?: string) {
		super(message, HTTP.STATUS_400);
	}
}

export class NotFoundException extends HttpException {
	constructor(public message: string = ERROR_MESSAGE_HTTP.NOT_FOUND) {
		super(message, HTTP.STATUS_404);
	}
}

export class UnauthorizedException extends HttpException {
	constructor(public message: string) {
		super(message, HTTP.STATUS_401);
	}
}

export class ForbiddenException extends HttpException {
	constructor(public message: string) {
		super(message, HTTP.STATUS_403);
	}
}

export class ConflictException extends HttpException {
	constructor(public message: string = ERROR_MESSAGE_HTTP.CONFLICT) {
		super(message, HTTP.STATUS_409);
	}
}

export class UnsupportedMediaTypeException extends HttpException {
	constructor(public message: string = ERROR_MESSAGE_HTTP.UNSUPPORTED_MEDIA_TYPE) {
		super(message, HTTP.STATUS_415);
	}
}

export class UnprocessableEntityException extends HttpException {
	constructor(public message: string = ERROR_MESSAGE_HTTP.UNPROCESABLE_ENTITY) {
		super(message, HTTP.STATUS_422);
	}
}

export class FailedDependencyException extends HttpException {
	constructor(public message: string = ERROR_MESSAGE_HTTP.FAILED_DEPENDENCY, public param?: string) {
		super(message, HTTP.STATUS_424);
	}
}
export class TooManyRequestsException extends HttpException {
	constructor(public message: string) {
		super(message, HTTP.STATUS_429);
	}
}

export class NotImplementedException extends HttpException {
	constructor(public message: string) {
		super(message, HTTP.STATUS_501);
	}
}

export class ServiceUnavailableException extends HttpException {
	constructor(public message: string) {
		super(message, HTTP.STATUS_503);
	}
}

export class GatewayTimeoutException extends HttpException {
	constructor(public message: string) {
		super(message, HTTP.STATUS_504);
	}
}
