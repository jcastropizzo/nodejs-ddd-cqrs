import { ICommand } from '@nestjs/cqrs';

export class HelloCommand implements ICommand {
  constructor(
    public readonly userId: string,
  ) {}
}
