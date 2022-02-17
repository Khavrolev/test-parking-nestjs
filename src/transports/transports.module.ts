import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Spot } from 'src/spots/spots.model';
import { TransportsController } from './transports.controller';
import { Transport } from './transports.model';
import { TransportsService } from './transports.service';

@Module({
  controllers: [TransportsController],
  providers: [TransportsService],
  imports: [SequelizeModule.forFeature([Transport, Spot])],
  exports: [TransportsService],
})
export class TransportsModule {}
