import {  HelloCommandHandler } from './hello.handler';
import { DebitAccountCommandHandler } from './debit-account.handler';
import { CreditAccountCommandHandler } from './credit-account.handler';
import { GetHistoryCommandHandler } from './get-history.handler';

export const CommandHandlers = [
  HelloCommandHandler,
  DebitAccountCommandHandler,
  CreditAccountCommandHandler,
  GetHistoryCommandHandler
];
