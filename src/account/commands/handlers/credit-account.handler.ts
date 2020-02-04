import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update-user.command';
import { AccountRepository } from '../../repository/account.repository';
import { Logger } from '@nestjs/common';
import { CreditAccountCommand } from '../impl/credit-account.command';
import { Operation } from 'account/constants/operations';

@CommandHandler(CreditAccountCommand)
export class CreditAccountCommandHandler
  implements ICommandHandler<CreditAccountCommand> {
  constructor(
    private readonly repository: AccountRepository
  ) {}

  async execute(command: CreditAccountCommand, resolve: (value?) => void) {
    Logger.log('Async UpdateUserHandler...', 'CreditAccountCommandHandler');
    var {Value} = await this.repository.getAccountBalance();
    if(Value==undefined){
      Logger.log('no account...', 'UpdateUserCommand');
      this.repository.createAccount(command.value);
    }else{
      this.repository.updateAccountBalance(Operation.Credit,command.value)
    }
    resolve();
  }
}
