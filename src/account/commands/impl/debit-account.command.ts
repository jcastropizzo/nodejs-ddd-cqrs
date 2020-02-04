import { ICommand } from '@nestjs/cqrs';
import { OperationDto } from '../../dtos/operation.dto';

export class DebitAccountCommand implements ICommand {
  constructor(
    public readonly value : number
  ) {}
}
