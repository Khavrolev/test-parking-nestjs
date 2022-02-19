import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TRANSPORT_SIZE } from 'src/constants/transports.constants';
import { SpotsService } from 'src/spots/spots.service';
import { DeleteTransportDto } from './dto/delete-transport.dto';
import { GetTransportDto } from './dto/get-transport.dto';
import { ParkTransportDto } from './dto/park-transport.dto';
import { Transport } from './transports.model';

@Injectable()
export class TransportsService {
  constructor(
    @InjectModel(Transport) private transportRepository: typeof Transport,
    private spotService: SpotsService,
  ) {}

  async parkTransport(dto: ParkTransportDto) {
    this.checkTypeFromEnum(dto.type);
    const transport = await this.transportRepository.findOne({
      where: { plate: dto.plate },
    });

    if (transport) {
      throw new BadRequestException(
        `There is transport with plate = ${dto.plate} in parking yet`,
      );
    }

    const transportNumericType = TRANSPORT_SIZE[dto.type];

    const avaliableSpots = await this.spotService.getAvaliableSpotForTransport(
      transportNumericType,
    );

    if (avaliableSpots.length === 0) {
      throw new BadRequestException(
        `Parking is full, we don't have place for your transport!`,
      );
    }

    const input = {
      ...dto,
      type: transportNumericType,
      spotId: avaliableSpots[0].id,
    };

    const parkedTransport = await this.transportRepository.create(input);

    return parkedTransport;
  }

  async getTransport(dto: GetTransportDto) {
    const transport = await this.getTransportByPlate(dto.plate, true);
    return transport;
  }

  async getAllTransports() {
    const transports = await this.transportRepository.findAll({
      include: { all: true },
    });
    return transports;
  }

  async deleteTransport(dto: DeleteTransportDto) {
    const transport = await this.getTransportByPlate(dto.plate, true);
    await transport.destroy();

    return transport;
  }

  private checkTypeFromEnum(type: string) {
    if (!(type in TRANSPORT_SIZE)) {
      throw new BadRequestException(`No '${type}' transport's type in parking`);
    }
  }

  private async getTransportByPlate(plate: string, includeSpot = false) {
    const transport = await this.transportRepository.findOne(
      includeSpot
        ? {
            where: { plate },
            include: { all: true },
          }
        : {
            where: { plate },
          },
    );

    if (!transport) {
      throw new BadRequestException(
        `No transport with plate = '${plate}' in parking`,
      );
    }

    return transport;
  }
}
