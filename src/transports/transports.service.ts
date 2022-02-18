import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TRANSPORT_SIZE } from 'src/constants/transports.constants';
import { SpotsService } from 'src/spots/spots.service';
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
    await this.checkTransportByPlate(dto.plate);

    const transportNumericType = TRANSPORT_SIZE[dto.type];

    ///decomposition
    const avaliableSpot =
      this.spotService.getSpotForTransport(transportNumericType);
    ///decomposition
    return avaliableSpot;
    const input = { ...dto, type: transportNumericType, spotId: 35 };
    const transport = this.transportRepository.create(input);

    return transport;
  }

  private checkTypeFromEnum(type: string) {
    if (!(type in TRANSPORT_SIZE)) {
      throw new BadRequestException(`No '${type}' transport's type in parking`);
    }
  }

  private async checkTransportByPlate(plate: string) {
    const transport = await this.transportRepository.findOne({
      where: { plate },
    });

    if (transport) {
      throw new BadRequestException(
        `There is transport with plate = ${plate} in parking yet`,
      );
    }
  }

  private async getTransportByPlate(plate: string) {
    const transport = await this.transportRepository.findOne({
      where: { plate },
    });

    if (transport) {
      throw new BadRequestException(
        `There is transport with plate = ${plate} in parking yet`,
      );
    }

    if (!transport) {
      throw new BadRequestException(
        `No transport with plate = '${plate}' in parking`,
      );
    }

    return transport;
  }
}
