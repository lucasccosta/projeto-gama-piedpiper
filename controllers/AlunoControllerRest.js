const RestRepository = require('../repositories/rest/RestRepository');

const apiUrl = 'http://localhost:3030';

exports.listarAlunos = async (req, h) => {
  const repository = new RestRepository(apiUrl, '/alunos');
  return aluno = await repository.list();
}

exports.obterAlunos = async (req, h) => {
  const repository = new RestRepository(apiUrl, '/alunos');

  return aluno = await repository.getById(req.params.id)
}

exports.inserirAlunos = async (req, h) => {
  const repository = new RestRepository(apiUrl, '/alunos');

  return repository.insert(req.payload)
}

// exports.inserirLancamento = async (req, h) => {
//   const repoAluno = new RestRepository(apiUrl, '/alunos');
//   return repoAluno.insert(req.payload);
// }

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
  const repository = new RestRepository(apiUrl, '/alunos');
	
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

// exports.atualizarLancamento = async (req, h) => {
//   const repoAluno = new RestRepository(apiUrl, '/alunos');
//   return repoAluno.update(req.params.id, req.payload);
// }

exports.deletarAluno = async (req, res) => {
  const repository = new RestRepository(apiUrl, '/alunos');

  return repository.delete(req.params.id)

}