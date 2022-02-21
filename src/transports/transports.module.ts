import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Spot } from 'src/models/spots.model';
import { SpotsModule } from 'src/spots/spots.module';
import { TransportsController } from './transports.controller';
import { Transport } from '../models/transports.model';
import { TransportsService } from './transports.service';

@Module({
  controllers: [TransportsController],
  providers: [TransportsService],
  imports: [SequelizeModule.forFeature([Transport, Spot]), SpotsModule],
  exports: [TransportsService],
})
export class TransportsModule {}
