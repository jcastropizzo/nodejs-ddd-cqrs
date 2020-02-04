import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { AccountRepository } from '../../repository/account.repository';
import { Logger } from '@nestjs/common';
import { GetHistoryCommand } from '../impl/get-history.command';

@CommandHandler(GetHistoryCommand)
export class GetHistoryCommandHandler
  implements ICommandHandler<GetHistoryCommand> {
  constructor(
    private readonly repository: AccountRepository
  ) {}

  async execute(command: GetHistoryCommand, resolve: (value?) => void) {
    Logger.log('Async GetHistoryCommandHandler...', 'GetHistoryCommand');
    resolve(await this.repository.getAccountHistory());
  }
}
