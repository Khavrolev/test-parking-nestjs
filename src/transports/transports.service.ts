import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RetrieveTransportDto } from './dto/retrieve-transport.dto';
import { GetTransportDto } from './dto/get-transport.dto';
import { ParkTransportDto } from './dto/park-transport.dto';
import { Transport } from '../models/transports.model';
import { SpotsService } from '../spots/spots.service';
import { TRANSPORT_SIZE } from '../constants/transports.constants';

@Injectable()
export class TransportsService {
  constructor(
    @InjectModel(Transport) private transportModel: typeof Transport,
    private readonly spotService: SpotsService,
  ) {}

  async parkTransport(dto: ParkTransportDto) {
    const transport = await this.transportModel.findOne({
      where: { plate: dto.plate },
    });

    if (transport) {
      throw new BadRequestException(
        `There is transport with plate = ${dto.plate} in parking yet`,
      );
    }

    const transportSize = TRANSPORT_SIZE[dto.type];

    const availableSpots = await this.spotService.getAvaliableSpotForTransport(
      transportSize,
    );

    if (availableSpots.length === 0) {
      throw new BadRequestException(
        `Parking is full, we don't have place for your transport!`,
      );
    }

    const input = {
      ...dto,
      size: transportSize,
      spotId: availableSpots[0].id,
    };

    return this.transportModel.create(input);
  }

  async getTransport(dto: GetTransportDto) {
    return this.getTransportByPlate(dto.plate);
  }

  async getAllTransports() {
    return await this.transportModel.findAll({
      include: { all: true },
    });
  }

  async retrieveTransport(dto: RetrieveTransportDto) {
    const transport = await this.getTransportByPlate(dto.plate);
    await transport.destroy();

    return transport;
  }

  private async getTransportByPlate(plate: string) {
    const transport = await this.transportModel.findOne({
      where: { plate },
      include: { all: true },
    });

    if (!transport) {
      throw new NotFoundException(
        `No transport with plate = '${plate}' in parking`,
      );
    }

    return transport;
  }
}
