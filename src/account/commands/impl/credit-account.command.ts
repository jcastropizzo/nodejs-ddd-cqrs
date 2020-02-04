import { ICommand } from '@nestjs/cqrs';

export class CreditAccountCommand implements ICommand {
  constructor(
    public readonly value : number
  ) {}
}
