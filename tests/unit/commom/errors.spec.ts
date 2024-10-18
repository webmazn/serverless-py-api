import {
	InternalServerErrorException,
	BadRequestException,
	NotFoundException,
	UnauthorizedException,
	ForbiddenException,
	ConflictException,
	UnsupportedMediaTypeException,
	UnprocessableEntityException,
	FailedDependencyException,
	TooManyRequestsException,
	NotImplementedException,
	ServiceUnavailableException,
	GatewayTimeoutException,
} from "../../../src/common/errors";
import { ERROR_MESSAGE_HTTP } from "../../../src/common/constants";
import { HTTP } from "../../../src/common/enums";

describe("HttpException Classes", () => {
	it("Should return a InternalServerErrorException should have status 500 and default message", () => {
		const exception = new InternalServerErrorException();
		expect(exception.statusCode).toBe(HTTP.STATUS_500);
		expect(exception.message).toBe(ERROR_MESSAGE_HTTP.INTERNAL_SERVER);
	});

	it("Should return a BadRequestException should have status 400 and custom message", () => {
		const message = "Invalid request";
		const exception = new BadRequestException(message);
		expect(exception.statusCode).toBe(HTTP.STATUS_400);
		expect(exception.message).toBe(message);
	});

	it("Should return a NotFoundException should have status 404 and default message", () => {
		const exception = new NotFoundException();
		expect(exception.statusCode).toBe(HTTP.STATUS_404);
		expect(exception.message).toBe(ERROR_MESSAGE_HTTP.NOT_FOUND);
	});

	it("Should return a UnauthorizedException should have status 401 and custom message", () => {
		const message = "Unauthorized access";
		const exception = new UnauthorizedException(message);
		expect(exception.statusCode).toBe(HTTP.STATUS_401);
		expect(exception.message).toBe(message);
	});

	it("Should return a ForbiddenException should have status 403 and custom message", () => {
		const message = "Access denied";
		const exception = new ForbiddenException(message);
		expect(exception.statusCode).toBe(HTTP.STATUS_403);
		expect(exception.message).toBe(message);
	});

	it("Should return a ConflictException should have status 409 and default message", () => {
		const exception = new ConflictException();
		expect(exception.statusCode).toBe(HTTP.STATUS_409);
		expect(exception.message).toBe(ERROR_MESSAGE_HTTP.CONFLICT);
	});

	it("Should return a UnsupportedMediaTypeException should have status 415 and default message", () => {
		const exception = new UnsupportedMediaTypeException();
		expect(exception.statusCode).toBe(HTTP.STATUS_415);
		expect(exception.message).toBe(ERROR_MESSAGE_HTTP.UNSUPPORTED_MEDIA_TYPE);
	});

	it("Should return a UnprocessableEntityException should have status 422 and default message", () => {
		const exception = new UnprocessableEntityException();
		expect(exception.statusCode).toBe(HTTP.STATUS_422);
		expect(exception.message).toBe(ERROR_MESSAGE_HTTP.UNPROCESABLE_ENTITY);
	});

	it("Should return a FailedDependencyException should have status 424 and default message", () => {
		const exception = new FailedDependencyException();
		expect(exception.statusCode).toBe(HTTP.STATUS_424);
		expect(exception.message).toBe(ERROR_MESSAGE_HTTP.FAILED_DEPENDENCY);
	});

	it("Should return a TooManyRequestsException should have status 429 and custom message", () => {
		const message = "Too many requests";
		const exception = new TooManyRequestsException(message);
		expect(exception.statusCode).toBe(HTTP.STATUS_429);
		expect(exception.message).toBe(message);
	});

	it("Should return a NotImplementedException should have status 501 and custom message", () => {
		const message = "Not implemented";
		const exception = new NotImplementedException(message);
		expect(exception.statusCode).toBe(HTTP.STATUS_501);
		expect(exception.message).toBe(message);
	});

	it("Should return a ServiceUnavailableException should have status 503 and custom message", () => {
		const message = "Service unavailable";
		const exception = new ServiceUnavailableException(message);
		expect(exception.statusCode).toBe(HTTP.STATUS_503);
		expect(exception.message).toBe(message);
	});

	it("Should return a GatewayTimeoutException should have status 504 and custom message", () => {
		const message = "Gateway timeout";
		const exception = new GatewayTimeoutException(message);
		expect(exception.statusCode).toBe(HTTP.STATUS_504);
		expect(exception.message).toBe(message);
	});
});
