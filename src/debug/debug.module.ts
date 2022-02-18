import { Module } from '@nestjs/common';
import { SpotsModule } from 'src/spots/spots.module';
import { DebugController } from './debug.controller';
import { DebugService } from './debug.service';

@Module({
  controllers: [DebugController],
  providers: [DebugService],
  imports: [SpotsModule],
})
export class DebugModule {}
