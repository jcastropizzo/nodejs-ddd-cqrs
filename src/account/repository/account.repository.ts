import { Injectable } from '@nestjs/common';
import { Account } from '../models/account.model';
import { AppDAO } from '../dao';
import { Operation } from '../constants/operations';

@Injectable()
export class AccountRepository {

  async getAccountBalance() : Promise<any> {
    return await AppDAO.get("Select Value from Account");
  }

  async getAccountHistory() {
    return await AppDAO.all("Select * from History",[]);
  }

  async createAccount(balance : number) {
    return AppDAO.run("Insert into History (Operation,Value) Values(?, ?)",[Operation.Credit,balance])
    .then(()=>{
      AppDAO.run("Insert into Account (Value) Values(?)",[balance])
    })
    .finally(()=> true)
    .catch(()=>false );
  }

  async updateAccountBalance(operation : Operation, value : number) {
    return AppDAO.run("Update Account Set Value=Value"+(operation ==Operation.Credit? "+":"-")+"?",[value])
    .then(()=>
      AppDAO.run("Insert into History (Operation,Value) Values(?, ?)",[operation,value])
    )
    .finally(()=> true)
    .catch(()=>false );
  }

  async hello() {
    return true;
  }
}
