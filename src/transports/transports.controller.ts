import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RetrieveTransportDto } from './dto/retrieve-transport.dto';
import { GetTransportDto } from './dto/get-transport.dto';
import { ParkTransportDto } from './dto/park-transport.dto';
import { TransportsService } from './transports.service';

@Controller('transports')
export class TransportsController {
  constructor(private readonly transportService: TransportsService) {}

  @Post()
  parkTransport(@Body() dto: ParkTransportDto) {
    return this.transportService.parkTransport(dto);
  }

  @Get(':plate')
  getTransport(@Param() dto: GetTransportDto) {
    return this.transportService.getTransport(dto);
  }

  @Get()
  getTransports() {
    return this.transportService.getAllTransports();
  }

  @Delete(':plate')
  retrieveSpot(@Param() dto: RetrieveTransportDto) {
    return this.transportService.retrieveTransport(dto);
  }
}
