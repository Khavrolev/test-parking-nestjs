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
    private readonly spotService: SpotsService,
  ) {}

  async parkTransport(dto: ParkTransportDto) {
    const transport = await this.transportRepository.findOne({
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

    return await this.transportRepository.create(input);
  }

  async getTransport(dto: GetTransportDto) {
    return await this.getTransportByPlate(dto.plate);
  }

  async getAllTransports() {
    return await this.transportRepository.findAll({
      include: { all: true },
    });
  }

  async deleteTransport(dto: DeleteTransportDto) {
    const transport = await this.getTransportByPlate(dto.plate);
    await transport.destroy();

    return transport;
  }

  private async getTransportByPlate(plate: string) {
    const transport = await this.transportRepository.findOne({
      where: { plate },
      include: { all: true },
    });

    if (!transport) {
      throw new BadRequestException(
        `No transport with plate = '${plate}' in parking`,
      );
    }

    return transport;
  }
}
