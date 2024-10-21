const { Module } = require('@nestjs/common');
import { ProductTransactionService } from './product-transaction.service';
import { ProductTransactionController } from './product-transaction.controller';
const { MongooseModule } = require('@nestjs/mongoose');
const { ProductTransactionController } = require('./product-transaction.controller');
const { ProductTransactionService } = require('./product-transaction.service');
const { ProductTransactionSchema } = require('./schemas/product-transaction.schema');

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: ProductTransactionSchema }])
  ],
  controllers: [ProductTransactionController],
  providers: [ProductTransactionService],
})
class ProductTransactionModule {}

module.exports = { ProductTransactionModule };
