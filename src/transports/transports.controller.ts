import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteTransportDto } from './dto/delete-transport.dto';
import { GetTransportDto } from './dto/get-transport.dto';
import { ParkTransportDto } from './dto/park-transport.dto';
import { TransportsService } from './transports.service';

@Controller('transports')
export class TransportsController {
  constructor(private transportService: TransportsService) {}

  @Post()
  parkTransport(@Body(new ValidationPipe()) dto: ParkTransportDto) {
    return this.transportService.parkTransport(dto);
  }

  @Get('/:plate')
  getTransport(@Param(new ValidationPipe()) dto: GetTransportDto) {
    return this.transportService.getTransport(dto);
  }

  @Get()
  getTransports() {
    return this.transportService.getAllTransports();
  }

  @Delete('/:plate')
  deleteSpot(@Param(new ValidationPipe()) dto: DeleteTransportDto) {
    return this.transportService.deleteTransport(dto);
  }
}
