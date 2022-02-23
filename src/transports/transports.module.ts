import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransportsController } from './transports.controller';
import { Transport } from '../models/transports.model';
import { TransportsService } from './transports.service';
import { SpotsModule } from '../spots/spots.module';

@Module({
  controllers: [TransportsController],
  providers: [TransportsService],
  imports: [SequelizeModule.forFeature([Transport]), SpotsModule],
  exports: [TransportsService],
})
export class TransportsModule {}
