const jwt = require('jsonwebtoken')

const CHAVE_SECRETA = 'meusegredo'

const token = jwt.sign({
  sub: 'lucas@email.com',
  iss: 'localhost:3000',
  aud: 'http://localhost:3000',
  exp: (Date.now()/1000) + 86400,
  iat: (Date.now()/1000)
}, CHAVE_SECRETA)

const payload = jwt.verify(token, CHAVE_SECRETA)