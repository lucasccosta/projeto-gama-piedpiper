const { MongoClient, ObjectId } = require('mongodb');

const connectionString = 'mongodb://localhost:27017/teste'

// Lista todos os alunos
exports.listarAlunos = async (req, res) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste')

  const alunos = await db.collection('aluno').find().toArray()

  await client.close()

  return alunos;
}

exports.obterAlunos = async (req, res) => {
  const client = await MongoClient.connect(connectionString)
  const db = client.db('teste')

  // temos que achar o id
  const _id = ObjectId.createFromHexString(req.params.id)
  const aluno = await db.collection('aluno').findOne({_id});

  await client.close();

  return aluno;
}

exports.inserirAlunos = async (req, res) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste')

  const { nome, telefone, curso } = req.payload;

  const aluno = await db.collection('aluno').insertOne({
    nome,
    telefone,
    curso,
    criacao: new Date()
  })

  await client.close();
  return aluno;
  // return aluno.ops[0];
}

// exports.inserirAlunos = async (req, res) => {
//   const client = await MongoClient.connect(connectionString);
//   const db = client.db('teste')

//   const { nome, telefone, curso: nomeCurso } = req.payload;

//   const curso = await db.collection('curso').findOne({ nome: nomeCurso}, {projection: {_id: 1}})

//   const aluno = await db.collection('aluno').insertOne({
//     nome,
//     telefone,
//     curso: curso._id,
//     criacao: new Date()
//   })

//   client.close();

//   return aluno.modifiedCount;
// }

// não tá funcionando
exports.atualizarAlunos = async (req, res) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id)
  const { nome, telefone, curso } = req.payload

  const aluno = await db
    .collection('aluno')
    .updateOne(
      {_id}, {
        $set:{
          nome,
          telefone,
          curso
        }
      }
     )

  await client.close();
  
  return aluno.modifiedCount;
}

exports.deletarAluno = async (req, res) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id);

  const resultado = await db.collection('aluno').deleteOne({_id})

  await client.close();
  
  return resultado.result;
}