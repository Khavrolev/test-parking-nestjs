import { Module } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { SpotsController } from './spots.controller';
import { Spot } from '../models/spots.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transport } from 'src/models/transports.model';

@Module({
  controllers: [SpotsController],
  providers: [SpotsService],
  imports: [SequelizeModule.forFeature([Spot, Transport])],
  exports: [SpotsService],
})
export class SpotsModule {}
