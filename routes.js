const AlunoController = require ('./controllers/AlunoControllerPoliglota')


module.exports = [
   {
    method: 'GET',
    path: '/alunos',
    handler: AlunoController.listarAlunos
  },
  {
    method: 'GET',
    path: '/alunos/{id}',
    handler: AlunoController.obterAlunos
  },
  {
    method: 'POST',
    path: '/alunos',
    handler: AlunoController.inserirLancamento
  },
  {
    method: 'PATCH',
    path: '/alunos/{id}',
    handler: AlunoController.atualizarLancamento
  },
  {
    method: 'DELETE',
    path: '/alunos/{id}',
    handler: AlunoController.deletarAluno
  }
]