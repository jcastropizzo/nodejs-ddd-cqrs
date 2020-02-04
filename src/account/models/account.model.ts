import { AggregateRoot } from '@nestjs/cqrs';
import { HistoryEntry } from './history-entry.model';

export class Account extends AggregateRoot {
  constructor(public balance: number) {
    super();
  }
  
  credit(value : number) {
    this.balance += value;
    return true;
  }

  debit(value : number) {
    if (this.balance< value)
      return false;
    this.balance -= value;
    return true;
  }
}
