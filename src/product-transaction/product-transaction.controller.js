const { Controller, Get, Query } = require('@nestjs/common');
const { ProductTransactionService } = require('./product-transaction.service');

@Controller('transactions')
class ProductTransactionController {
  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  @Get('initialize')
  async initialize() {
    return this.transactionService.fetchAndSeedData();
  }

  @Get()
  async getTransactions(@Query('month') month, @Query('search') search, @Query('page') page = 1, @Query('perPage') perPage = 10) {
    return this.transactionService.getTransactions(month, search, page, perPage);
  }

  @Get('statistics')
  async getStatistics(@Query('month') month) {
    return this.transactionService.getStatistics(month);
  }

  @Get('bar-chart')
  async getBarChart(@Query('month') month) {
    return this.transactionService.getBarChart(month);
  }

  @Get('pie-chart')
  async getPieChart(@Query('month') month) {
    return this.transactionService.getPieChart(month);
  }

  @Get('combined')
  async getCombined(@Query('month') month) {
    const [statistics, barChart, pieChart] = await Promise.all([
      this.transactionService.getStatistics(month),
      this.transactionService.getBarChart(month),
      this.transactionService.getPieChart(month)
    ]);
    return { statistics, barChart, pieChart };
  }
}

module.exports = { ProductTransactionController };
