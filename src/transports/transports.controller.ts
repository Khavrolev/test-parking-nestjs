import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ParkTransportDto } from './dto/park-transport.dto';
import { TransportsService } from './transports.service';

@Controller('transports')
export class TransportsController {
  constructor(private transportService: TransportsService) {}

  @Post()
  parkTransport(@Body(new ValidationPipe()) dto: ParkTransportDto) {
    return this.transportService.parkTransport(dto);
  }
}
