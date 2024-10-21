const { Module } = require('@nestjs/common');
import { ProductTransactionModule } from './product-transaction/product-transaction.module';
const { MongooseModule } = require('@nestjs/mongoose');
const { ProductTransactionModule } = require('./product-transaction/product-transaction.module');

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/transactions'),
    ProductTransactionModule,
  ],
})
class AppModule {}

module.exports = { AppModule };
