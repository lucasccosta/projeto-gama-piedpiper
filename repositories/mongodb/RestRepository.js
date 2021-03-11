// Esse Repositório é um geral, que apenas substitui métodos CRUD
// Os de regra de negócio vão para outro repositório

const { ObjectId } = require('mongodb')

class MongoDbRepository {
  constructor({db, collection}) {
    this.db = db;
    this.collection = db.collection(collection);
  }

  async list(query = {}){
    return this.collection.find(query).toArray()
  }

  async get(query = {}, options = {}){
    return this.collection.findOne(query, options);
  }

  async getById(id){
    const _id = ObjectId.createFromHexString(id)
    return this.collection.findOne({_id})
  }

  async insert(doc){
    const { ops } = await this.collection.insertOne(doc);
    return ops[0];
  }

  async update(id, doc){
    const _id = ObjectId.createFromHexString(id);
    const { modifiedCount } = await this.collection.updateOne({_id}, {
      $set: doc
    })
    return modifiedCount
  }

  async delete(id){
    const _id = ObjectId.createFromHexString(id);
    const resultado = await this.collection.deleteOne({_id});

    return resultado
  }


}

module.exports = MongoDbRepository;