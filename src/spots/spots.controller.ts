import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { GetSpotDto } from './dto/get-spot.dto';
import { DeleteSpotDto } from './dto/delete-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { SpotsService } from './spots.service';

@Controller('spots')
export class SpotsController {
  constructor(private spotService: SpotsService) {}

  @Post()
  createSpot(@Body(new ValidationPipe()) dto: CreateSpotDto) {
    return this.spotService.createSpot(dto);
  }

  @Get('/:id')
  getSpot(@Param(new ValidationPipe()) dto: GetSpotDto) {
    return this.spotService.getSpot(dto);
  }

  @Get()
  getSpots() {
    return this.spotService.getAllSpots();
  }

  @Put()
  updateSpot(@Body(new ValidationPipe()) dto: UpdateSpotDto) {
    return this.spotService.updateSpot(dto);
  }

  @Delete('/:id')
  deleteSpot(@Param(new ValidationPipe()) dto: DeleteSpotDto) {
    return this.spotService.deleteSpot(dto);
  }
}
