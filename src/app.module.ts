import { Module, OnModuleInit } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { EventStoreModule } from './core/event-store/event-store.module';

@Module({
  imports: [
    EventStoreModule.forRoot(),
    AccountModule,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {}
}
