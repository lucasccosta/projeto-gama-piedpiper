const Hapi = require('@hapi/hapi');
const rotas = require('./routes');

(async function() {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  rotas.forEach(rota => server.route(rota));

  await server.start();
  console.log('Nosso servidor está rodando e esperando requisições!', server.info.uri)

})()