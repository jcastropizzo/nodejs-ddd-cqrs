import { CommandBus, EventBus, CQRSModule } from '@nestjs/cqrs';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandHandlers } from './commands/handlers';
import { AccountController } from './controllers/account.controller';
import { EventStoreModule } from '../core/event-store/event-store.module';
import { EventStore } from '../core/event-store/event-store';
import { AccountRepository } from './repository/account.repository';
import { AccountService } from './services/account.service';

@Module({
  imports: [
    CQRSModule,
    EventStoreModule.forFeature(),
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    ...CommandHandlers,
    AccountRepository,
  ],
})
export class AccountModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly eventStore: EventStore,
  ) {}

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.event$.setModuleRef(this.moduleRef);
    /** ------------ */
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$);
    this.event$.publisher = this.eventStore;
    /** ------------ */
    this.command$.register(CommandHandlers);
  }
}
