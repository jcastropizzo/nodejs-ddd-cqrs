import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AccountService } from '../services/account.service';

@Controller('account')
@ApiUseTags('Account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @ApiOperation({ title: 'Debit account' })
  @ApiResponse({ status: 200, description: 'Debit account.' })
  @Post("debit/:value")
  async debit( @Param('value') value : number ): Promise<boolean> {
    return this.accountService.debit(value);
  }

  /*--------------------------------------------*/
  @ApiOperation({ title: 'Credit account' })
  @ApiResponse({ status: 200, description: 'Credit account.' })
  @Post('credit/:value')
  async credit(@Param('value') value : number) {
    return this.accountService.credit(value);
  }

  /* History */
  /*--------------------------------------------*/
  @ApiOperation({ title: 'List History' })
  @ApiResponse({ status: 200, description: 'List History.' })
  @Get()
  async getHistory() {
    return this.accountService.getHistory();
  }
}
