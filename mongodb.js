const {MongoClient, ObjectId} = require('mongodb');

(async () =>{
  
  const client = await MongoClient.connect('mongodb://localhost:27017/teste');

  const db = client.db('teste')

  const lancamentos = db.collection('lancamentos')

  const novoLancamento = {
    descricao: "Lanche",
    valor: -18.40,
    criacao: new Date(),
    categoria: ObjectId.createFromHexString('60403440ab55ebcda01a38c4')
  }

  const resultado = await lancamentos.insertOne(novoLancamento)

  await client.close

})()
