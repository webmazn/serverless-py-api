import { AxiosError } from "axios";
import { inject, injectable } from "tsyringe";
import { $log } from "ts-log-debug";
import TYPES from "../../types";
import { Person } from "./interfaces/star-wars.interface";
import { METHOD, PROVIDER } from "../../common/enums";
import ApiConnectorUtil from "../../utils/apiConnectorUtil";

@injectable()
export default class StarWarsProvider {
	constructor(@inject(TYPES.StarWarsConnector) private starWarsConnector: ApiConnectorUtil) {}

	async findByIdSWAPI(id: number): Promise<Person | null> {
		$log.info(`${PROVIDER.STAR_WARS} ${METHOD.FIND}`);
		try {
			const personResponse = await this.starWarsConnector.get(`${process.env.API_SWAPI_URL}/${id}`);
			$log.debug(personResponse.data);
			return personResponse.data;
		} catch (e) {
			if (e instanceof AxiosError) {
				$log.error(e.message);
			}
			return null;
		}
	}
}
