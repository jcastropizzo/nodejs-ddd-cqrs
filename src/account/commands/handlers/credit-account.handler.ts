import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from '../../repository/account.repository';
import { Logger } from '@nestjs/common';
import { CreditAccountCommand } from '../impl/credit-account.command';
import { Operation } from 'account/constants/operations';
import { isNullOrUndefined } from 'util';

@CommandHandler(CreditAccountCommand)
export class CreditAccountCommandHandler
  implements ICommandHandler<CreditAccountCommand> {
  constructor(
    private readonly repository: AccountRepository
  ) { }

  async execute(command: CreditAccountCommand, resolve: (value?) => void) {
    try {
      var { Value } = await this.repository.getAccountBalance();
      if (Value != undefined) {
        this.repository.updateAccountBalance(Operation.Credit, command.value)
        resolve();
      }
    } catch (a) {
      this.repository.createAccount(command.value);
     }
    resolve();
  }
}
