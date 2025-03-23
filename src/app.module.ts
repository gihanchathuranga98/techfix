import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Inventory } from './entities/inventory.entity';
import { Quote } from './entities/quote.entity';
import { QuoteItem } from './entities/quote-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Inventory, Quote, QuoteItem]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'postgres',
      extra: {
        timezone: 'UTC',
      },
      entities: [User, Inventory, Quote, QuoteItem],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
