const { MongoClient, ObjectId } = require('mongodb');

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

exports.listarLancamentos = async (filtro) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const lancamentos = await db
  .collection('lancamentos')
  .find(filtro)
  .toArray();

  await client.close();

  return lancamentos
}

exports.listarLancamentos = async (req, h) => {
  return this.listarLancamentos();
}

// exports.listarLancamentos = async (req, h) => {
//   const client = await MongoClient.connect(connectionString);
//   const db = client.db('teste');

//   const lancamentos = await db.collection('lancamentos').find().toArray();

//   await client.close();

//   return lancamentos
// }

exports.obterLancamentos =  async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  // Lembrando que a busca retorna uma string, mas precisamos do tipo ObjectId, então parseamos
  const _id = ObjectId.createFromHexString(req.params.id)
  const lancamento = await db.collection('lancamentos').findOne( {_id });

  await client.close();

  return lancamento;
}

exports.inserirLancamentos = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  // payload = body
  // os que vão estar presentes no payload
  const { categoria: nomeCategoria, valor, descricao } = req.payload

  // tá dando erro com projection
  // const categoria = await db.collection('categorias').findOne( { nome: nomeCategoria }, {projection: { _id: 1} } );
  /* const categoria = await db.collection('categorias').findOne( { nome: nomeCategoria } ); */
  // substituindo
  const categoria = await obterCategoria(db, nomeCategoria);

  const resultado = await db.collection('lancamentos').insertOne({
    descricao,
    valor,
    categoria,
    // criacao: new Date(),
  })

  await client.close();

  return resultado.ops[0];
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
