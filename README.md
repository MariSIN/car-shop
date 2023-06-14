
# Boas-vindas ao projeto Car-shop

Para este projeto, foi aplicado os princípios de Programação Orientada a Objetos (POO) para a construção de uma API com CRUD para gerenciar uma concessionária de veículos, utilizando o banco de dados MongoDB através do framework do Mongoose.


## Autores

- [@MariSIN](https://www.github.com/MariSIN)


## Stack utilizada

**Back-end:** Node, Express, MongoDB, Mongoose, Typescript, Docker


## Funcionalidades

- POST /cars e /motorscycle
- GET /cars e /motorscycle
- GET /cars/:id e /motorscycle/:id
- PUT /cars/:id e /motorscycle/:id
- DELETE /cars/:id e motorscycle/:id


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test:mocha
```
```bash
  npm run test:coverage
```


## Requisitos

### 01 - Crie a rota /cars onde seja possível cadastrar um carro

- O endpoint deve ser acessível através do caminho (`/cars`);

- Os atributos necessários para criar um carro estão na tabela:

| Atributos | Descrição |
| :-------: | :-------- |
| `id`   | _String_ contendo id do veículo |
| `model`   | _String_ contendo modelo do veículo |
| `year`    | _Number_ contendo ano de fabricação do veículo |
| `color`   | _String_ contendo cor principal do veículo |
| `status`  | _Booleano_ contendo status que define se um veículo pode ou não ser comprado _(este atributo deve ser opcional e se não passado, deve ser `false`)_ |
| `buyValue` | _Number_ contendo valor de compra do veículo |
| `doorsQty` | _Number_ contendo quantidade de portas de um carro |
| `seatsQty` | _Number_ contendo quantidade de assentos de um carro |

- O corpo da requisição poderá seguir o formato abaixo:

```json
{
  "model": "Marea",
  "year": 2002,
  "color": "Black",
  "status": true,
  "buyValue": 15.990,
  "doorsQty": 4,
  "seatsQty": 5
}
```

---

### 02 - Crie o endpoint para listar carros

- O endpoint deve ser acessível através do caminho (`/cars`) e (`/cars/:id`);

---

### 03 - Escreva testes para cobrir 30% da camada de Service


### 04 - Crie a rota /cars/:id onde seja possível atualizar um carro por ID

- O endpoint deve ser acessível através do caminho (`/cars/:id`);

- O corpo da requisição poderá seguir o formato abaixo:
```json
{
  "model": "Marea",
  "year": 1992,
  "color": "Red",
  "status": true,
  "buyValue": 12.000,
  "doorsQty": 2,
  "seatsQty": 5
}
```
---

### 05 - Crie a rota /motorcycles onde seja possível cadastrar uma moto

- O endpoint deve ser acessível através do caminho (`/motorcycles`);

- Os atributos necessários para criar uma moto estão na tabela:

| Atributos | Descrição |
| :-------: | :-------- |
| `id`   | _String_ contendo id do veículo |
| `model`   | _String_ contendo modelo do veículo |
| `year`    | _Number_ contendo ano de fabricação do veículo |
| `color`   | _String_ contendo cor principal do veículo |
| `status`  | _Booleano_ contendo status que define se um veículo pode ou não ser comprado _(este atributo deve ser opcional e se não passado, deve ser `false`)_ |
| `buyValue` | _Number_ contendo valor de compra do veículo |
| `category` | _String_ contendo categoria da moto _(opções: `Street`, `Custom` ou `Trail`)_ |
| `engineCapacity` | _Number_ contendo capacidade do motor |

- O corpo da requisição poderá seguir o formato abaixo:
```json
{
  "model": "Honda Cb 600f Hornet",
  "year": 2005,
  "color": "Yellow",
  "status": true,
  "buyValue": 30.000,
  "category": "Street",
  "engineCapacity": 600
}
```
---

### 06 - Escreva testes para cobrir 60% da camada de Service


### 07 - Crie a rota /motorcycles onde seja possível listar motos

- O endpoint deve ser acessível através do caminho (`/motorcycles`) e (`/motorcycles/:id`);

---

### 08 - Crie a rota /motorcycles/:id onde seja possível atualizar uma moto por ID

- O endpoint deve ser acessível através do caminho (`/motorcycles/:id`);

- O corpo da requisição poderá seguir o formato abaixo:

```json
{
  "model": "Honda Cb 600f Hornet",
  "year": 2014,
  "color": "Red",
  "status": true,
  "buyValue": 45.000,
  "category": "Street",
  "engineCapacity": 600
}
```

---

### 09 - Escreva testes para cobrir 80% da camada de Service


### 10 - Crie a rota /cars/:id onde seja possível excluir um carro por ID

- O endpoint pode ser acessível através do caminho (`/cars/:id`);

---

### 11 - Crie a rota /motorcycles/:id onde seja possível excluir uma moto por ID

- O endpoint pode ser acessível através do caminho (`/motorcycles/:id`);

---

