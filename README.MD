# Turma 1 da Gama Academia - Accademia Accenture 2.0
Projeto de Java - Grupo Pied Piper

### Integrantes
- [Lucas Costa](https://github.com/lucasccosta)
- [Laís Marques](https://github.com/laismarques)
- [Felipe Mandu](https://github.com/felipemandu)

### Requisitos do projeto
O Projeto trata do desenvolvimento de uma API REST com persistência poliglota utilizando o conhecimento em REST API NodeJs. Utilizou-se também o Banco de dados denormalizado NoSQL Mongodb e o NoSQLBooster como auxiliador para a realização de testes e visualização de dados. A aplicação deve ser capaz de realizar as operações de CRUD em aplicações de variadas linguagens e banco de dados, no caso específico do projeto, o CRUD é realizado em uma aplicação NodeJs utilizando o banco de dados [MongoDb](https://www.mongodb.com/), e em uma aplicação Java utilizando o banco de dados [H2]( http://www.h2database.com/html/main.html).


### Etapas do desenvolvimento
Foi escolhido como  framework responsável da criação de um servidor http apto a receber requisições e a realizar ações, o framework [Hapi](https://hapi.dev/) e alguns módulos externos. Com o projeto estruturado, foi iniciado o desenvolvimento usando a IDE [Visual Studio Code](https://code.visualstudio.com/).

Utilizamos um modelo em que haveria uma única entidade Aluno, e ele seria composto por suas informações principais, e informações de Endereço e Disciplinas cursadas por esse aluno. A escolha de uma entidade única foi feita visando justamente a característica do MongoDb ser um banco denormalizado, então poderíamos introduzir uma lógica de modelagem de dados mais simplista que se adequaria ao relacionar essa entidade a outros banos

A partir daí foram desenvolvidas as funções relativas à criação do servidor, os endpoints que nossa aplicação utilizará e separamos o nosso projeto a partir de diretórios de controllers, middlewares e repositories do projeto.

### Pré-requisitos
- npm install antes de rodar
- nodemon instalado global com sudo npm i -g nodemon ou opção local abaixo
- json-server instalado global caso queira utilizar a persistência em REST

### Como rodar a API
- node server.js

ou utilizando o nodemon:

### global
nodemon server.js

### local
npx nodemon server.js

### Trocando de persistência

Para configurar qual será o repositório utilizado para persistir os dados recebidos pela API, utilize o header X-Persistence na requisição, com um dos seguintes valores:

mongodb - padrão
Precisa de um servidor de MongoDB rodando em localhost na porta 3000. O banco padrão para as operações é "teste".

rest
Tenta se conectar em uma API de REST rodando em localhost na porta 8080. A rota padrão para as operações é /alunos.

### Para gerar a documentação via swagger
- url: http://localhost:3000/doc
