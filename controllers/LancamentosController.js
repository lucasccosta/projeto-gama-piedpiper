const { MongoClient, ObjectId } = require('mongodb');
const MongoDbRepository = require('../repositories/MongoDbRepository')
const LancamentosRepository = require('../repositories/LancamentosRepository')
const jwt = require('jsonwebtoken');

const connectionString = 'mongodb://localhost:27017/teste'

async function obterCategoria(db, nome) {
  const categoria = await db.collection('categorias').findOne({nome}, {projection: {_id:1}})
  return categoria._id;
}

  async function obterSaldo(db) {
    const resultado = await db.collection('lancamentos').aggregate([
      {
        $group: {
            _id: '',
            saldo: { $sum: '$$ROOT.valor' }
        }
      }
    ]).toArray();
    const [{ saldo }] = resultado;
    return saldo;
}

async function listarLancamentos (filtro) {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const lancamentos = await db
  .collection('lancamentos')
  .find(filtro)
  .toArray();

  await client.close();

  return lancamentos;
}

function validarJwt(token){
  let valido = false;
  try {
    const payload = jwt.verify(token, 'chavesecreta')
    valido = !!payload;
    /*isso é igual a:
    if(payload){
      valido = true
    }*/
  } catch (error) {
  }
  return valido;
}

// exports.listarLancamentos = async (req, h) => {
//   return listarLancamentos();
// }

// Com Jwt
exports.listarLancamentos = async (req, h) => {
<<<<<<< HEAD
  const response = h.response();

  const { authorization } = req.headers;
  
  if(!authorization){
    response.code = 401;
    return { error: 'Authorization não foi enviado'}
  }
  const [scheme, token] = authorization.split(' ')

  // Verificação se
  if(scheme !== 'Bearer'){
    response.code = 401;
    return { error: 'Scheme inválido'}
  }

  const valido = validarJwt(token);
  if(!valido){
    response.code = 401;
    return { error: 'Não autorizado'}
  }

=======
>>>>>>> d64b410ca12ceead1ee797f20aa86a4a52746993
  return listarLancamentos();
}

exports.listarReceitas = async (req, res) => {
<<<<<<< HEAD
  const db = req.server.plugins['hapi-mongodb'].db;
  const repositorio = new LancamentosRepository(db, 'lancamentos')

  return repositorio.list({ valor: { $gte:0 } });
}

exports.listarDespesas = async (req, res) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repositorio = new LancamentosRepository(db, 'lancamentos')

  return repositorio.list({ valor: { $lt: 0 } });
=======
  return listarLancamentos({ valor: { $gte: 0} });
}

exports.listarDespesas = async (req, res) => {
  return listarLancamentos({ valor: { $lt: 0} });
>>>>>>> d64b410ca12ceead1ee797f20aa86a4a52746993
}

// exports.listarLancamentos = async (req, h) => {
//   const client = await MongoClient.connect(connectionString);
//   const db = client.db('teste');

//   const lancamentos = await db.collection('lancamentos').find().toArray();

//   await client.close();

//   return lancamentos
// }
exports.listarLancamentos = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repositorio = new LancamentosRepository(db, 'lancamentos')

  return repositorio.list();
}

exports.obterLancamentos =  async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db
  const repositorio = new LancamentosRepository(db, 'lancamentos')
  const lancamento = await repositorio.getById(req.params.id)

  return lancamento;
}

exports.inserirLancamentos = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db
  const repoLancamentos = new LancamentosRepository(db, 'lancamentos');
  const repoCategorias = new MongoDbRepository(db, 'categorias')

  const { categoria: nome, valor, descricao } = req.payload

  const categoria = await repoCategorias.get({ nome }, { projection: { _id: 1 } })
  const lancamento = {
    descricao,
    valor,
    categoria: categoria?._id,
    criacao: new Date()
  }
  
  return repoLancamentos.insert(lancamento)
}
exports.atualizarLancamentos = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  // Lembrando que a busca retorna uma string, mas precisamos do tipo ObjectId, então parseamos
  const _id = ObjectId.createFromHexString(req.params.id)
  const { categoria, valor, descricao } = req.payload;
  const lancamento = { valor, descricao}

  if(categoria){
    lancamento.categoria = await obterCategoria(db, categoria);
  }
  
  const resultado = await db
  .collection('lancamentos')
  .updateOne( {_id },{
    $set: lancamento
  });

  await client.close();

  return resultado.modifiedCount;

}
exports.apagarLancamentos = async (req, h) => {
    const client = await MongoClient.connect(connectionString);
    const db = client.db('teste');
  
    const _id = ObjectId.createFromHexString(req.params.id);
  
    const resultado = await db.collection('lancamentos').deleteOne({_id})
  
    client.close();
    return resultado.result;
}

exports.obterSaldo = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');
  
  const saldo = await obterSaldo(db)

  client.close();
  return saldo;
}

exports.agruparPorCategoria = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');
  
  const agrupamentos = await db.collection('lancamentos').aggregate([
    {
      $group: {_id: '$categoria', total: {$sum: '$$ROOT.valor'}} // agrupar pela chave (os ids) de categoria
    }, // e rolará uma soma com o próprio documento ($$ROOT) e o .valor da despesa
    { // porém ao rodar isso, não seriam vistos os nomes da categoria, no banco de dados
      $lookup: { // lembrando que a chave do agrupamento é o _id: categoria, então o lookup é feito com o id CATEGORIA
        from: 'categorias', // collection que estamos procurando o agrupamento
        localField: '_id', // o campo em que estamos buscando a nossa chave primária - no nosso caso é o _id, pois o agrupamos por categoria - logo ele não é mais um id de !!lancamentos!! e sim de categoria
        foreignField: '_id', // id da categoria mesmo
        as: 'categoria' // e esse é o retrieve - o que aparecerá como coluna do banco de dados
      }
    },
    {
        $unwind: '$categoria'// lookup sempre retorna um array, então teremos que usar o unwind
    }, // só que agora há mais campos que necessitamos, só precisamos de categoria e total, logo, faremos um project
    {
      $project: { total: 1, categoria: '$categoria.nome', _id: 0} // _id: 0 é pra tirar o id da projeção
    } // total: 1 - é para definir que ele vai permanecer no pipeline
  ]).toArray();

  // O reduce é para transformar aqueles arrays em um objeto com todos as "categorias: valores"
  const resultado = agrupamentos.reduce((acumulador, { total, categoria}) => {
    acumulador[categoria] = total; // para acessar as propriedades de um objeto, usamos o []
    return acumulador
  }, {});

  await client.close();

  return resultado;
}
