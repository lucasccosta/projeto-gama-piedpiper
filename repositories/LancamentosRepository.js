const MongoDbRepository = require('./MongoDbRepository');


class LancamentosRepository extends MongoDbRepository {
  constructor(db) {
    super(db, 'lancamentos');
  }

  async obterSaldo() {
    const resultado = await this.collection.aggregate([
      {
        $group: {
            _id: '',
            saldo: { $sum: '$$ROOT.valor' }
        }
      }
    ]).toArray();
    const [{ saldo }] = resultado;
    return saldo;
  }

  async resumoPorCategoria() {
    const agrupamentos = await this.collection.aggregate([
      {
        $group: { _id: '$categoria', total: { $sum: '$$ROOT.valor' } }
      },
      {
        $lookup: {
          from: 'categorias',
          localField: '_id',
          foreignField: '_id',
          as: 'categoria'
        }
      },
      {
        $unwind: '$categoria'
      },
      {
        $project: { total: 1, categoria: '$categoria.nome', _id: 0 }
      }
    ]).toArray();

    const resultado = agrupamentos.reduce((acumulador, { total, categoria }) => {
      acumulador[categoria] = total;
      return acumulador;
    }, {});

    return resultado;
  }
}

module.exports = LancamentosRepository;