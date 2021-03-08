const {MongoClient, ObjectId} = require('mongodb');
const connectionString = 'mongodb://localhost:27017/teste'

exports.listarEndereco = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  await client.close();
}

exports.listarEndereco = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const endereco = db.collection('endereco').find().toArray();

  await client.close();

  return endereco;
}

exports.obterEndereco = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id);
  const endereco = await db.collection('endereco').findOne({_id});

  await client.close();
  return endereco;
}

exports.inserirEndereco = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  // const {rua, numero, cidade, complemento, uf, cep} = req.payload
  const endereco = await db.collection('endereco').insertOne({
    $set: req.payload
  })

  await client.close();
  return endereco;
}

exports.atualizarEndereco = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  client.close();
  return ;

}

exports.deletarEndereco = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id)
  const endereco = await db.collection('endereco').deleteOne({_id})

  await client.close();
  return endereco.result;
}