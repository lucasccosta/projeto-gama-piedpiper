const Hapi = require('@hapi/hapi');
const rotas = require('./routes');
const MongoDbMiddleware = require('./middlewares/MongoDBMiddleware');
const AutorizacaoMiddleware = require('./middlewares/AutorizacaoMiddleware');

const swaggered = require('hapi-swaggered');
const swaggeredUI = require('hapi-swaggered-ui');
const vision = require('vision');
const inert = require('inert');


(async function() {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register([
    inert,
    vision,
    {
      plugin: swaggered,
      options: {
        auth: false,
        info: {
          title: 'Persistência Poliglota',
          description: 'API - Sistema de Gerenciamento de Alunos - Que permite o Cadastro, Inclusão, Consulta e Exclusão de Alunos com Autenticação JSON Web Token - Persistência Poliglota',
          version: '1.0.0',
          termsOfService: "https://swagger.io/terms/",
          contact: {
            name: "PiedPiper",
            url: "https://github.com/lucasccosta/projeto-gama-piedpiper",
            email: "lucas_ccg@hotmail.com"
          },
          license: {
            name: "MIT - LICENSE",
            url: "https://github.com/lucasccosta/projeto-gama-piedpiper"
          }
        }
      }
    },
    {
      plugin: swaggeredUI,
      options: {
        auth: false,
        title: 'API - Alunos',
        path: '/doc',
        authorization: {
          field: 'apiKey',
          scope: 'query', // header works as well
          // valuePrefix: 'bearer '// prefix incase
          defaultValue: 'demoKey',
          placeholder: 'Enter your apiKey here'
        },
        swaggerOptions: {
          validatorUrl: null
        }
      }
    }
  ])

  // Só usar a função se for proteger as rotas
  await AutorizacaoMiddleware(server);
  await MongoDbMiddleware(server)

  rotas.forEach(rota => server.route(rota));
  
  await server.start();
  console.log('Nosso servidor está rodando e esperando requisições!', server.info.uri)

})()