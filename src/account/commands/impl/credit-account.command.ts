import { ICommand } from '@nestjs/cqrs';
import { OperationDto } from '../../dtos/operation.dto';

export class CreditAccountCommand implements ICommand {
  constructor(
    public readonly value : number
  ) {}
}
