import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DebitAccountCommand } from 'account/commands/impl/debit-account.command';
import { CreditAccountCommand } from 'account/commands/impl/credit-account.command';
import { GetHistoryCommand } from 'account/commands/impl/get-history.command';

@Injectable()
export class AccountService {
  constructor(private readonly commandBus: CommandBus) {}

  async credit(value : number) {
    return await this.commandBus.execute(
      new CreditAccountCommand(value)
    );
  }

  async debit(value : number) {
    return await this.commandBus.execute(
      new DebitAccountCommand(value)
    );
  }

  async getHistory(){
    return await this.commandBus.execute(
      new GetHistoryCommand()
    );
  }
}
