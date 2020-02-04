import { ICommand } from '@nestjs/cqrs';

export class DebitAccountCommand implements ICommand {
  constructor(
    public readonly value : number
  ) {}
}
