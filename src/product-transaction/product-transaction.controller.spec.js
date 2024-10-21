import { Test } from '@nestjs/testing';
import { ProductTransactionController } from './product-transaction.controller';

describe('ProductTransaction Controller', () => {
  let controller;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductTransactionController],
    }).compile();

    controller = module.get(ProductTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
