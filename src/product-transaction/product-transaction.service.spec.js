import { Test } from '@nestjs/testing';
import { ProductTransactionService } from './product-transaction.service';

describe('ProductTransactionService', () => {
  let service;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ProductTransactionService],
    }).compile();

    service = module.get(ProductTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
