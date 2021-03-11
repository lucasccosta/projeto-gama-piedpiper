function obterConfig(req) {
  return req.headers['x-persistence'] === 'rest'
    ? { apiUrl: 'http://localhost:8080', resourcePath: 'aluno' }
    : { db: req.server.plugins['hapi-mongodb'].db, collection: 'aluno' };
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
exports.inserirAlunos = async (req, h) => {
  const persistencia = req.headers['x-persistence'];
  const RestRepository = require(`../repositories/${persistencia}/RestRepository`);
  const repository = new RestRepository(obterConfig(req));

  let aluno = req.payload;
  if (persistencia === 'rest') {
    aluno = mappearAlunoToJavaAPI(aluno);
  }
  return repository.insert(aluno);
}



exports.atualizarAlunos = async (req, h) => {
  const persistencia = req.headers['x-persistence'];

  if (persistencia == 'mongodb') {
    const RestRepository = require(`../repositories/${persistencia}/RestRepository`);
    const repository = new RestRepository(obterConfig(req));
    const resultado1 = await repository.update(req.params.id, req.payload);
    const aluno = await repository.getById(req.params.id);
    Object
      .keys(aluno.disciplinas)
      .forEach(nomeDisciplina => {
        const disciplina = aluno.disciplinas[nomeDisciplina];
        aluno.disciplinas[nomeDisciplina] = calcularMedias(disciplina);
      });
    return resultado2 = await repository.update(req.params.id, aluno);
  } else {
    const RestRepository = require(`../repositories/${persistencia}/RestRepository`);
    const repository = new RestRepository(obterConfig(req));
    const id = req.params.id;
    let aluno = mappearAlunoToJavaAPI(req.payload);
    const disciplinas = aluno.disciplinas;
    const endereco = aluno.endereco[0];
    aluno = await repository.update(id, aluno, '');
    disciplinas.forEach(disciplina => {
      repository.update(id, disciplina, 'disciplina');
    })
    await repository.update(id, endereco, `endereco/${aluno.endereco[0].id}`);

    return await repository.getById(id);

  }
}

exports.deletarAlunos = async (req, res) => {
  const persistencia = req.headers['x-persistence'];
  const RestRepository = require(`../repositories/${persistencia}/RestRepository`);
  const repository = new RestRepository(obterConfig(req), "aluno");
  return repository.delete(req.params.id)

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

function mappearAlunoToJavaAPI(aluno) {
  const disciplinas = [];
  aluno.disciplinas.forEach(disciplinaObj => {
    const key = Object.keys(disciplinaObj)[0];
    const object = Object.values(disciplinaObj)[0];
    object.nome = key;
    disciplinas.push(object);
  })
  aluno.endereco = [aluno.endereco]
  aluno.disciplinas = disciplinas;
  return aluno;
}
