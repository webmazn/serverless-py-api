import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { $log } from "ts-log-debug";
import { GENERIC_MESSAGES } from "../common/constants";

let dynamoDBClient: DynamoDBClient;
let dynamoDBDocumentClient: DynamoDBDocumentClient;

const getDynamoDBDocumentClient = (): DynamoDBDocumentClient => {
	if (dynamoDBDocumentClient) {
		$log.debug(GENERIC_MESSAGES.EXISTS_INTANCE_DYNAMO);
		return dynamoDBDocumentClient;
	}
	if (!dynamoDBClient) {
		const credentials =
			process.env.ACCESS_KEY_ID && process.env.SECRET_ACCESS_KEY
				? {
						accessKeyId: process.env.ACCESS_KEY_ID,
						secretAccessKey: process.env.SECRET_ACCESS_KEY,
				  }
				: undefined;
		dynamoDBClient = new DynamoDBClient({
			credentials,
			region: process.env.REGION,
		});
		$log.debug(credentials ? GENERIC_MESSAGES.EXISTS_INTANCE_DYNAMO : GENERIC_MESSAGES.NEW_CLIENT_DYNAMO);
	}
	dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);
	$log.debug(GENERIC_MESSAGES.INITIALIZED_CLIENT_DYNAMO);
	return dynamoDBDocumentClient;
};

export default getDynamoDBDocumentClient;
