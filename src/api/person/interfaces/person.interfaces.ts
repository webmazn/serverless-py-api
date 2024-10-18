export interface IPersonService {
	create(request: CreateRequest): Promise<CreateResponse>;
	find(id: string): Promise<CreateRequest>;
}

export interface IPersonRepository {
	create(request: CreateRequest): Promise<CreateResponse>;
	find(id: string): Promise<CreateResponse | null>;
}

export interface CreateRequest {
	nombre: string;
	altura: string;
	peso: string;
	color_cabello: string;
	color_piel: string;
	color_ojos: string;
	fecha_nacimiento: string;
	genero: string;
	planeta_natal: string;
}

export interface CreateResponse {
	id: string;
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
}
