import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../impl/update-user.command';
import { AccountRepository } from '../../repository/account.repository';
import { Logger } from '@nestjs/common';
import { CreditAccountCommand } from '../impl/credit-account.command';
import { DebitAccountCommand } from '../impl/debit-account.command';
import { GetHistoryCommand } from '../impl/get-history.command';

@CommandHandler(GetHistoryCommand)
export class GetHistoryCommandHandler
  implements ICommandHandler<GetHistoryCommand> {
  constructor(
    private readonly repository: AccountRepository
  ) {}

  async execute(command: GetHistoryCommand, resolve: (value?) => void) {
    Logger.log('Async GetHistoryCommandHandler...', 'GetHistoryCommand');
    // var account = this.repository.getAccountBalance();
    // if
    // await this.repository.updateUser(userDto);
    resolve(await this.repository.getAccountHistory());
  }
}
