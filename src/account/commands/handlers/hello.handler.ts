import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { HelloCommand } from '../impl/hello.command';
import { AccountRepository } from '../../repository/account.repository';
import { Logger } from '@nestjs/common';

@CommandHandler(HelloCommand)
export class HelloCommandHandler
  implements ICommandHandler<HelloCommand> {
  constructor(
    private readonly repository: AccountRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: HelloCommand, resolve: (value?) => void) {
    Logger.log('Async HelloCommandHandler...', 'HelloCommand');
    // const {userId} = command;
    // const user = this.publisher.mergeObjectContext(
    //   await this.repository.welcomeUser({userId}),
    // );
    // user.commit();
    resolve();
  }
}
