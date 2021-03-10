function obterConfig(req) {
  return req.headers['x-persistence'] === 'rest'
    ? 'http://localhost:3030' 
    : req.server.plugins['hapi-mongodb'].db;
}

// const RestRepository = require(`../repositories/${persistencia}/RestRepository`);

// const CONFIG = PERSISTENCIA === 'rest' ? 'http://localhost:3030' : 'mongodb://localhost:27017/teste';
// // const CONFIG = 


exports.listarAlunos = async (req, h) => {
  const persistencia = req.headers['x-persistence'];
  const RestRepository = require(`../repositories/${persistencia}/RestRepository`);
  const repository = new RestRepository(obterConfig(req));
  return repository.list();
}

exports.obterAlunos = async (req, h) => {
  const persistencia = req.headers['x-persistence'];
  const RestRepository = require(`../repositories/${persistencia}/RestRepository`);
  const repository = new RestRepository(obterConfig(req));
  return aluno = await repository.getById(req.params.id)
}
exports.inserirLancamento = async (req, h) => {
  const persistencia = req.headers['x-persistence'];
  const RestRepository = require(`../repositories/${persistencia}/RestRepository`);
  const repository = new RestRepository(obterConfig(req));
  return repository.insert(req.payload);
}

exports.atualizarLancamento = async (req, h) => {
  const persistencia = req.headers['x-persistence'];
  const RestRepository = require(`../repositories/${persistencia}/RestRepository`);
  const repository = new RestRepository(obterConfig(req));
  return repository.update(req.params.id, req.payload);
}

exports.deletarAluno = async (req, res) => {
  const persistencia = req.headers['x-persistence'];
  const RestRepository = require(`../repositories/${persistencia}/RestRepository`);
  const repository = new RestRepository(obterConfig(req));
  return repository.delete(req.params.id)

}