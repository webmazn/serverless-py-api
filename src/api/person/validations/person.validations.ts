import Joi from "joi";

export const createPersonValidation = Joi.object({
	altura: Joi.string().required(),
	color_cabello: Joi.string().required(),
	color_ojos: Joi.string().required(),
	color_piel: Joi.string().required(),
	fecha_nacimiento: Joi.string().required(),
	genero: Joi.string().required(),
	nombre: Joi.string().required(),
	peso: Joi.string().required(),
	planeta_natal: Joi.string().required(),
});

export const findByIdValidation = Joi.string().required();
