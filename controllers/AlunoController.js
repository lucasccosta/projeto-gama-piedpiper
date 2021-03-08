/*
Aluno: nome, telefone, curso
Endereço: rua, numero, cidade, complemento, uf, cep
Disciplinas: nome, nota1, nota2, notaTrabalho, notaApresentacao, conceito, status
*/

const {MongoClient, ObjectId} = require('mongodb');
const connectionString = 'mongodb://localhost:27017/teste'

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

  const { nome, telefone, curso, disciplina:{
    nomeDisciplina, nota1, nota2, notaTrabalho, notaApresentacao, conceito, status
  }, endereco:{rua, numero, cidade, complemento, uf, cep} } = req.payload

  const aluno = await db.collection('aluno').insertOne({
    nome,
    telefone,
    curso,
    endereco:{
      rua,
      numero,
      cidade,
      complemento,
      uf,
      cep,
    },
    disciplina:{
      nomeDisciplina,
      nota1,
      nota2,
      notaTrabalho,
      notaApresentacao,
      conceito,
      status
    },
    criacao: new Date()
  })

  await client.close();

  return aluno;
}

exports.atualizarAlunos = async (req, res) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id)

  const resultado = await db
    .collection('aluno')
    .updateOne(
      {_id},
        {
        $set: req.payload
      }
     )

  await client.close();
  
  return resultado.modifiedCount;
}

// exports.inserirDisciplinas = async (req, res) => {
//   const client = await MongoClient.connect(connectionString);
//   const db = client.db('teste');

//   const _id = ObjectId.createFromHexString(req.params.id)

//   const resultado = await db
//     .collection('aluno')
//     .updateOne(
//       {_id},
//         {
//         $set: req.payload
//       }
//      )

//   await client.close();
  
//   return resultado.modifiedCount;
// }


exports.deletarAluno = async (req, res) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste');

  const _id = ObjectId.createFromHexString(req.params.id);

  const resultado = await db.collection('aluno').deleteOne({_id})

  await client.close();
  
  return resultado.result;
}