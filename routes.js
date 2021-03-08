const LancamentosController = require ('./controllers/LancamentosController.js')
const AlunoController = require ('./controllers/AlunoController.js')
const EnderecoController = require ('./controllers/EnderecoController')
const DisciplinaController = require ('./controllers/DisciplinaController')

module.exports = [
  {
    method: 'GET',
    path: '/lancamentos',
    handler: LancamentosController.listarLancamentos
  },
  {
    method: 'GET',
    path: '/lancamentos/{id}',
    handler: LancamentosController.obterLancamentos
  },
  {
    method: 'POST',
    path: '/lancamentos',
    handler: LancamentosController.inserirLancamentos
  },
  {
    method: 'PATCH',
    path: '/lancamentos/{id}',
    handler: LancamentosController.atualizarLancamentos
  },
  {
    method: 'DELETE',
    path: '/lancamentos/{id}',
    handler: LancamentosController.apagarLancamentos
  },
  {
    method: 'GET',
    path: '/lancamentos/saldo',
    handler: LancamentosController.obterSaldo
  },
  {
    method: 'GET',
    path: '/lancamentos/receitas',
    handler: LancamentosController.listarReceitas
  },
  {
    method: 'GET',
    path: '/lancamentos/despesas',
    handler: LancamentosController.listarDespesas
  },
  {
    method: 'GET',
    path: '/lancamentos/por-categoria',
    handler: LancamentosController.agruparPorCategoria
  },

  // ----------------- Alunos ---------------
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
    handler: AlunoController.inserirAlunos
  },
  {
    method: 'PATCH',
    path: '/alunos/{id}',
    handler: AlunoController.atualizarAlunos
  },
  {
    method: 'DELETE',
    path: '/alunos/{id}',
    handler: AlunoController.deletarAluno
  },
  // -------------------- Disciplina ------------------
  {
    method: 'GET', 
    path: '/disciplina',
    handler: DisciplinaController.listarDisciplina
  },

  {
    method: 'GET', 
    path: '/disciplina/{id}', 
    handler: DisciplinaController.obterDisciplina
  },

  {
    method: 'GET', 
    path: '/disciplina/status/{id}', 
    handler: DisciplinaController.obterStatus
  },

  {
    method: 'POST', 
    path: '/disciplina', 
    handler: DisciplinaController.inserirDisciplina
  },

  {
    method: 'PATCH', 
    path: '/disciplina/{id}', 
    handler: DisciplinaController.atualizarDisciplina
  }, 

  {
    method: 'DELETE', 
    path: '/disciplina/{id}', 
    handler: DisciplinaController.deletarDisciplina
  },

    // -------------------- Endereco --------------------
  {
    method: 'GET',
    path: '/endereco',
    handler: EnderecoController.listarEndereco
  },
  {
    method: 'GET',
    path: '/endereco/{id}',
    handler: EnderecoController.obterEndereco
  },
  {
  method: 'POST',
  path: '/endereco',
  handler: EnderecoController.inserirEndereco
  },
  {
  method: 'PATCH',
  path: '/endereco/{id}',
  handler: EnderecoController.atualizarEndereco
  },
  {
  method: 'DELETE',
  path: '/endereco/{id}',
  handler: EnderecoController.deletarEndereco
  },
]