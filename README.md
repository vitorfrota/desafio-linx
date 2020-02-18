# Desafio Linx

Este é um desafio proposto pela Linx para o desenvolvimento de API's + integração com outras aplicações. Há duas API's no repositório, a API de catálogo é consumida pela API de recomendação e o Front consome a API de recomendação

## Introdução

Para executar este projeto você deve iniciar primeiramente a API de catálogo, executando o script yarn dev através do prompt ou terminal, em seguida, inicie a API de recomendação seguindo o mesmo procedimento da anterior.

### Pré-requisitos

`` ``
- Node JS
- Yarn
`` ``

## Documentação API catálogo

### Introdução

A função desta API é fornecer os dados do catálogo de produtos da loja. Esta API será consumida pela API de recomendação. Como será iniciada localmente, o acesso à API é a partir de http://localhost:3333. Todos os dados são enviados como JSON.


### Endpoints

A API possui um único endpoint, sendo ele responsável por fornecer os dados de um determinado produto.

`` ``
**GET** /product/:id
`` ``

**Parâmetros**

Nome | Requerido | Descrição
-----|-----------|----------
id   |Obrigatório| O ID do produto que você deseja buscar no catálogo da loja
type | Opcional  | Caso você queira ter como resposta somente os dados (name,price,status,categories), você deve declarar após o id do produto **'?type=compact'** (Ex: /product/1?type=compact)

## Documentação API recomendação

### Introdução

A função desta API é fornecer uma lista de produtos que são mais populares e que estão com desconto. Esta API será consumida pelo frontend da aplicação. Como será iniciada localmente, o acesso à API é a partir de http://localhost:3334. Todos os dados são enviados como JSON.


### Endpoints

A API possui um único endpoint, sendo ele responsável por fornecer a lista de produtos mais populares e os que estão com desconto. A API por padrão retorna somente 10 produtos na lista, caso queira que retorne mais, você deve utilizar o parâmetro que encontra na lista a seguir:

`` ``
**GET** /recommendation
`` ``

**Parâmetros**

Nome | Requerido | Descrição
-----|-----------|----------
maxProducts |Opcional| Caso queira uma quantidade específica de produtos, utilize **'?maxProducts=10'** (Obs: O valor mínimo é de 10 produtos).


## Autores

**Vitor Frota** - (https://github.com/vitorfrota)

