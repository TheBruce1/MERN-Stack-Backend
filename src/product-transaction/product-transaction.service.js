const { Injectable } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');
const { Model } = require('mongoose');
const axios = require('axios');

@Injectable()
class ProductTransactionService {
  constructor(transactionModel, httpService) {
    this.transactionModel = transactionModel;
    this.httpService = httpService;
  }

  async fetchAndSeedData() {
    const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    await this.transactionModel.insertMany(data);
    return { message: 'Database initialized successfully' };
  }

  async getTransactions(month, search, page = 1, perPage = 10) {
    const filter = { dateOfSale: { $regex: month, $options: 'i' } };
    if (search) {
      filter['$or'] = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: search }
      ];
    }
    return this.transactionModel.find(filter).skip((page - 1) * perPage).limit(perPage).exec();
  }

  async getStatistics(month) {
    const filter = { dateOfSale: { $regex: month, $options: 'i' } };
    const totalSales = await this.transactionModel.aggregate([
      { $match: filter },
      { $group: { _id: null, totalSales: { $sum: '$price' }, totalSold: { $sum: { $cond: ['$sold', 1, 0] } }, totalNotSold: { $sum: { $cond: ['$sold', 0, 1] } } } }
    ]);
    return totalSales[0];
  }

  async getBarChart(month) {
    const filter = { dateOfSale: { $regex: month, $options: 'i' } };
    const ranges = [
      [0, 100], [101, 200], [201, 300], [301, 400],
      [401, 500], [501, 600], [601, 700], [701, 800],
      [801, 900], [901, 10000]
    ];
    const result = await Promise.all(
      ranges.map(([min, max]) => this.transactionModel.countDocuments({ ...filter, price: { $gte: min, $lt: max } }))
    );
    return ranges.map(([min, max], idx) => ({ range: `${min}-${max}`, count: result[idx] }));
  }

  async getPieChart(month) {
    const filter = { dateOfSale: { $regex: month, $options: 'i' } };
    const categories = await this.transactionModel.aggregate([
      { $match: filter },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    return categories;
  }
}

module.exports = { ProductTransactionService };
