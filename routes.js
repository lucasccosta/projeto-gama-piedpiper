const AlunoController = require ('./controllers/AlunoControllerPoliglota')
const AutorizacaoController = require ('./controllers/AutorizacaoController')


module.exports = [
   {
    method: 'GET',
    path: '/alunos',
    options: {
      tags: ['api']
    },
    handler: AlunoController.listarAlunos
  },
  {
    method: 'GET',
    path: '/alunos/{id}',
    options: {
      tags: ['api']
    },
    handler: AlunoController.obterAlunos
  },
  {
    method: 'POST',
    path: '/alunos',
    options: {
      tags: ['api']
    },
    handler: AlunoController.inserirAlunos
  },
  {
    method: 'PATCH',
    path: '/alunos/{id}',
    options: {
      tags: ['api']
    },
    handler: AlunoController.atualizarAlunos
  },
  {
    method: 'DELETE',
    path: '/alunos/{id}',
    options: {
      tags: ['api']
    },
    handler: AlunoController.deletarAlunos
  },
  {
    method: 'POST',
    path: '/token',
    options: {
      auth: false
    },
    handler: AutorizacaoController.token
    }
]