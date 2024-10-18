# serverless-py-api - technical challenge

Este archivo `README.md` proporciona una descripción de los requerimientos, end-points, scripts npm y tecnologías empleados en este proyecto `serverless-py-api` (_aws serverless application_).

## Requerimientos

#### Instalación de paquetes

```bash
npm install
```

- instalar `aws cli` (aws configure: para configurar sus credenciales de aws, validar version: aws --version) - [documentación](https://aws.amazon.com/es/cli/)
- instalar `aws sam cli` (desarrollo local, despligue: samlocal deploy, validar version: sam --version) - [documentación](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

* instalar `localstack` (desarrollo local, iniciar: localstack start, validar version: localstack --version) - [documentación](https://hub.docker.com/r/localstack/localstack)

## End-points disponibles

#### 1. Create person

- **Method**: `POST`
- **URL**: `{{url}}/v1/api/person`
- **Descripción**: Crea una nueva persona en la BD

#### \* cURL

```bash
curl --location --request POST 'https://randomkey.execute-api.us-east-1.amazonaws.com/Prod/v1/api/person' \
--header 'Content-Type: application/json' \
--data '
{
    "altura": "186",
    "color_cabello": "negro",
    "color_ojos": "marrones",
    "color_piel": "claro",
    "nombre": "Maycol Zambrano",
    "fecha_nacimiento": "19BBY",
    "genero": "masculino",
    "peso": "99",
    "planeta_natal": "Earth"
}'
```

#### 2. Find person by id

- **Method**: `GET`
- **URL**: `{{url}}/v1/api/person/{id}`
- **Descripción**: Obtiene la información de una persona por su ID

#### \* cURL

```bash
curl --location --request GET 'https://randomkey.execute-api.us-east-1.amazonaws.com/Prod/v1/api/person/c0745445-9a70-4710-bb28-637b70071896'
```

#### 3. Find all person

- **Method**: `GET`
- **URL**: `{{url}}/v1/api/person/all`
- **Descripción**: Obtiene todas lasm personas

#### \* cURL

```bash
curl --location --request GET 'https://randomkey.execute-api.us-east-1.amazonaws.com/Prod/v1/api/person/all
```

## Scripts disponibles

A continuación, se detallan los scripts disponibles y su funcionalidad:

### `deploy`

Este script inicia el despliegue en `aws`.

```bash
npm run deploy
```

| Script   | Task             |
| :------- | :--------------- |
| `deploy` | `npm run deploy` |

### `test`

Este script se utiliza para compilar `TypeScript` y para iniciar los test unitarios

```bash
npm run test
```

| Script | Task                              |
| :----- | :-------------------------------- |
| `test` | `npm run compile && npm run unit` |

### `format`

Este script utiliza Prettier para verificar si el código dentro del proyecto cumple con las reglas de formato definidas en Prettier. No realiza cambios en el código.

```bash
npm run format
```

| Script   | Task                 |
| :------- | :------------------- |
| `format` | `prettier --write .` |

### `lint`

Este script ejecuta `ESLint` para analizar el código en el directorio `src`. ESLint es una herramienta de linting que ayuda a detectar errores y mantener un estilo de código consistente.

```bash
npm run lint
```

| Script | Task            |
| :----- | :-------------- |
| `lint` | `eslint src/**` |

## Stack tecnológico

![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=node.js&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon&logoColor=white)
![Api Gateway](https://img.shields.io/badge/Api_wategay-FF4F8B?style=for-the-badge&logo=amazonapigateway&logoColor=white)
![S3](https://img.shields.io/badge/Amazon_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)
![Dynamo](https://img.shields.io/badge/Dynamo_DB-316192?style=for-the-badge&logo=amazondynamodb&logoColor=white)
![Lambda](https://img.shields.io/badge/Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white)
![Eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Gitlab](https://img.shields.io/badge/GitLab-FCA326?style=for-the-badge&logo=gitlab&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
