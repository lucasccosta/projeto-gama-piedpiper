const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken')

const connectionString = 'mongodb://localhost:27017/teste'

exports.token = async (req, h) =>{
  const response = h.response();

  const { authorization } = req.headers;
  
  if(!authorization){
    response.code = 401;
    return { error: 'Authorization não foi enviado'}
  }

  const [scheme, valor] = authorization.split(' ')
  // Verificação se
  if(scheme !== 'Basic'){
    response.statusCode = 401;
    return { error: 'Scheme inválido'}
  }

  const credenciais = Buffer.from(valor, 'base64').toString();
  // split por 2 pontos pra transformar a string em email e senha
  const [email, senha] = credenciais.split(':')

  // Verificação se existe email ou senha
  if(!email || !senha){
    response.statusCode = 401;
    return { error: 'Não existe usuário ou senha'}
  }

  const client = await MongoClient.connect(connectionString);
  const db = client.db('teste')
  
  
  const usuario = await  db.collection('usuarios').findOne( { email, senha } )

  // Busca por usuário, caso não haja (!usuario) -> statusCode 401 e esse return indica que a execução volta lá pra cima
  if(!usuario){
    response.statusCode = 401;
    return { error: 'Usuário ou senha inválidos'}
  }

  // Criando token novo
  const token = jwt.sign({ sub: usuario._id.toString() }, 'chavesecreta' )

  return {
    access_token: token,
  }
}