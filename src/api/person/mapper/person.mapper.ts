import { Person } from "../../../provider/star-wars/interfaces/star-wars.interface";
import { CreateRequest, CreateResponse } from "../interfaces/person.interfaces";

export const personMapperResponse = (person: CreateResponse | Person | null): CreateRequest => {
	const {
		birth_year: fecha_nacimiento = "",
		eye_color: color_ojos = "",
		hair_color: color_cabello = "",
		gender: genero = "",
		height: altura = "",
		name: nombre = "",
		homeworld: planeta_natal = "",
		mass: peso = "",
		skin_color: color_piel = "",
	} = person || {};

	return {
		nombre,
		altura,
		peso,
		color_cabello,
		color_piel,
		color_ojos,
		fecha_nacimiento,
		genero,
		planeta_natal,
	};
};
