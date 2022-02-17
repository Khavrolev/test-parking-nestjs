import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Spot } from './spots/spots.model';
import { SpotsModule } from './spots/spots.module';
import { Transport } from './transports/transports.model';
import { TransportsModule } from './transports/transports.module';
import { DebugModule } from './debug/debug.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Spot, Transport],
      autoLoadModels: true,
    }),
    SpotsModule,
    TransportsModule,
    DebugModule,
  ],
})
export class AppModule {}
