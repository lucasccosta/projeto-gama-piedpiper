/*
Aluno: nome, telefone, curso
Endereço: rua, numero, cidade, complemento, uf, cep
Disciplinas: nome, nota1, nota2, notaTrabalho, notaApresentacao, conceito, status
*/

const {MongoClient, ObjectId} = require('mongodb');
<<<<<<< HEAD
const MongoDbRepository = require('../repositories/MongoDbRepository');
const connectionString = 'mongodb://localhost:27017/teste'

exports.listarAlunos = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repository = new MongoDbRepository(db, 'aluno');
=======
const connectionString = 'mongodb://localhost:27017/teste'

exports.listarAlunos = async (req, res) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste')

  const alunos = await db.collection('aluno').find().toArray()
>>>>>>> d64b410ca12ceead1ee797f20aa86a4a52746993

  return aluno = await repository.list();
}

exports.obterAlunos = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repository = new MongoDbRepository(db, 'aluno');

  return aluno = await repository.getById(req.params.id)
}

/* INSERIR
exports.inserirAlunos = async (req, res) => {
  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste')

<<<<<<< HEAD
  const aluno = await db.collection('aluno').insertOne(req.payload)

  // const aluno = await db.collection('aluno').insertOne({
  //   nome,
  //   telefone,
  //   curso,
  //   endereco:{
  //     rua,
  //     numero,
  //     cidade,
  //     complemento,
  //     uf,
  //     cep,
  //   },
  //   disciplina:{
  //     nodejs,
  //     java,
  //     nomeDisciplina,
  //     nota1,
  //     nota2,
  //     notaTrabalho,
  //     notaApresentacao,
  //     conceito,
  //     status
  //   },
  //   criacao: new Date()
  // })
=======
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
>>>>>>> d64b410ca12ceead1ee797f20aa86a4a52746993

  await client.close();

  return aluno;
}
*/
exports.inserirAlunos = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repository = new MongoDbRepository(db, 'aluno')

<<<<<<< HEAD
  return resultado = await repository.insert(req.payload)
}

function calcularMedias(disciplina) {
  const { nota1, nota2, notaApresentacao, notaTrabalho } = disciplina;
  let conceito;
  const notaFinal = (nota1 + nota2 + notaApresentacao + notaTrabalho) / 4;
  if(notaFinal < 2) {
      conceito = "F";
  } else if (notaFinal < 4) {
      conceito = "E";
  } else if (notaFinal < 5) {
      conceito = "D";
  } else if (notaFinal < 7) {
      conceito = "C";
  } else if (notaFinal < 8.5) {
      conceito = "B";
  } else {
      conceito = "A";
  }

  let status;
  switch(conceito) {
    case "A":
    case "B":
    case "C":
      status = "Aprovado";
      break;
    case "D":
    case "E":
    case "F":
      status = "Reprovado";
      break;
    default:
      status = "Não se aplica";
}
console.log(status)
  return {
    ...disciplina,
    notaFinal,
    conceito,
    status
  };
}
exports.atualizarAlunos = async (req, h) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repository = new MongoDbRepository(db, 'aluno')
	
  // 1 - primeiro update
  const resultado1 = await repository.update(req.params.id, req.payload);
  // 2 - obter o aluno
  const aluno = await repository.getById(req.params.id);
  // 3 - calcular as médias de cada disciplina
  Object
    .keys(aluno.disciplinas)
    .forEach(nomeDisciplina => {
      const disciplina = aluno.disciplinas[nomeDisciplina];
      // { prova1, notaTrabalho, prova2, conceito, mencao, status }
      aluno.disciplinas[nomeDisciplina] = calcularMedias(disciplina);
    });
  // 4 - atualizar o aluno de novo (2º update)
  const resultado2 = await repository.update(req.params.id, aluno);
  
  return resultado2;
}

// exports.atualizarAlunos = (req, h) => {
//   const db = req.server.plugins['hapi-mongodb'].db;
//   const repository = new MongoDbRepository(db, 'aluno')

//   const  alunos  = req.payload

//   return repository.update(req.params.id, alunos)
// }

// exports.inserirDisciplinas = async (req, res) => {
//   const client = await MongoClient.connect(connectionString);
//   const db = client.db('teste');
=======
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
>>>>>>> d64b410ca12ceead1ee797f20aa86a4a52746993

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
  
<<<<<<< HEAD
//   return resultado.modifiedCount;
// }

=======
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
>>>>>>> d64b410ca12ceead1ee797f20aa86a4a52746993

exports.deletarAluno = async (req, res) => {
  const db = req.server.plugins['hapi-mongodb'].db;
  const repository = new MongoDbRepository(db, 'aluno');

  return repository.delete(req.params.id)

}