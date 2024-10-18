import "reflect-metadata";
import { container } from "tsyringe";
import TYPES from "./types";
import PersonHandler from "./api/person/handler/person.handler";
import PersonService from "./api/person/service/person.service";
import PersonRepository from "./api/person/repository/person.repository";
import ApiConnectorUtil from "./utils/apiConnectorUtil";
import StarWarsProvider from "./provider/star-wars/star-wars.provider";
import getDynamoDBDocumentClient from "./utils/dynamo-client";

container.register(TYPES.StarWarsConnector, {
	useValue: new ApiConnectorUtil({
		host: process.env.API_SWAPI_URL!,
	}),
});
container.register(TYPES.DynamoDBClient, {
	useValue: getDynamoDBDocumentClient(),
});
container.register<PersonHandler>(TYPES.PersonHandler, {
	useClass: PersonHandler,
});
container.register<PersonService>(TYPES.PersonService, {
	useClass: PersonService,
});
container.register<PersonRepository>(TYPES.PersonRepository, {
	useClass: PersonRepository,
});
container.register<StarWarsProvider>(TYPES.StarWarsProvider, {
	useClass: StarWarsProvider,
});

export default container;
