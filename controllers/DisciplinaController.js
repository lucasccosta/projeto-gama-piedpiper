const {MongoClient, ObjectId} = require('mongodb');
const connectionString = 'mongodb://localhost:27017/teste'

exports.listarDisciplina = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const disciplina = await db.collection('disciplina').find().toArray();

  await client.close();
  
  return disciplina
}

exports.obterDisciplina = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id);
  
  const disciplina = await db.collection('disciplina').findOne({_id});

  await client.close();

  return disciplina;
}

exports.obterStatus = async (req, h) =>{
  // adicionar o parametro do aluno, para retornar somente o status da disciplina do aluno
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id);
  
  const status = db.collection('disciplina').findOne({_id}, {status: 1, });

  await client.close();

  return status;

}

exports.inserirDisciplina = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const {nome, nota1, nota2, notaTrabalho, notaApresentacao, conceito} = req.payload;

  const media = (nota1 + nota2 + notaTrabalho + notaApresentacao) / 4;

  const disciplina = await db.collection('disciplina').insertOne({
    nome, 
    nota1, 
    nota2, 
    notaTrabalho, 
    notaApresentacao, 
    conceito, 
    media, 
    status = media > 7 ? 'Aprovado' : 'Reprovado'
  });

  await client.close();

  return disciplina;
}

exports.atualizarDisciplina = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id);

  const {nome, nota1, nota2, notaTrabalho, notaApresentacao, conceito, media, status} = req.payload;

  const resultado = await db.collection('disciplina').updateOne({_id}, {$set: disciplina});

  await client.close();

  return resultado.modifiedCount;
}

exports.deletarDisciplina = async (req, h) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id);

  const resultado = db.collection('disciplina').deleteOne({_id});

  await client.close();

  return resultado.result;
}