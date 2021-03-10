const Hapi = require('@hapi/hapi');
const rotas = require('./routes');
const MongoDbMiddleware = require('./middlewares/MongoDBMiddleware');

(async function() {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })
  // Só usar a função se for proteger as rotas
  // await AutorizacaoMiddleware(server);
  await MongoDbMiddleware(server)

  rotas.forEach(rota => server.route(rota));
  
  // server.route({
  //   path: '/',
  //   method: 'GET',
  //   handler: (req, h) => h.db()
  // })
  await server.start();
  console.log('Nosso servidor está rodando e esperando requisições!', server.info.uri)

})()