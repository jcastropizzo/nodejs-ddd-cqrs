import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../services/account.service';

describe('Users Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService],
    }).compile();
  });
  it('should be defined', () => {
    const controller: AccountController = module.get<AccountController>(AccountController);
    expect(controller).toBeDefined();
  });
});
