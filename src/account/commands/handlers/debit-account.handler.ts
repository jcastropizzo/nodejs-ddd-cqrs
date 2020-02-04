import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from '../../repository/account.repository';
import { Logger } from '@nestjs/common';
import { DebitAccountCommand } from '../impl/debit-account.command';
import { Operation } from 'account/constants/operations';

@CommandHandler(DebitAccountCommand)
export class DebitAccountCommandHandler
  implements ICommandHandler<DebitAccountCommand> {
  constructor(
    private readonly repository: AccountRepository
  ) {}

  async execute(command: DebitAccountCommand, resolve: (value?) => void) {
    Logger.log('Async DebitAccountCommandHandler...', 'DebitAccountCommand');
    var { Value } = await this.repository.getAccountBalance();
    Logger.log(await this.repository.getAccountBalance());
    if(Value!=undefined && Value>=command.value){
      this.repository.updateAccountBalance(Operation.Debit,command.value)
    }
    resolve();
  }
}
