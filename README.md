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
**GET** product/:id
`` ``

Paramêtros

Nome | Requerido | Descrição
-----|-----------|----------
id   |Obrigatório| O ID do produto que você deseja buscar no catálogo da loja
type | Opcional  | Caso você queira ter como resposta somente os dados (name,price,status,categories), você deve declarar após o id do produto **'?type=compact'** (Ex: /product/1?type=compact)



## Autores

**Vitor Frota** - (https://github.com/vitorfrota)

