import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SPOT_SIZE } from 'src/constants/spots.constants';
import { Transport } from 'src/transports/transports.model';
import { CreateSpotDto } from './dto/create-spot.dto';
import { GetSpotDto } from './dto/get-spot.dto';
import { DeleteSpotDto } from './dto/delete-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { Spot } from './spots.model';

@Injectable()
export class SpotsService {
  constructor(@InjectModel(Spot) private spotRepository: typeof Spot) {}

  async createSpot(dto: CreateSpotDto) {
    const input = { size: SPOT_SIZE[dto.type] };
    const spot = await this.spotRepository.create(input);

    return spot;
  }

  async createManySpots(dtos: CreateSpotDto[]) {
    const input = dtos.map((item) => {
      return { size: SPOT_SIZE[item.type] };
    });

    const spots = await this.spotRepository.bulkCreate(input);

    return spots;
  }

  async getSpot(dto: GetSpotDto) {
    const spot = await this.getSpotById(dto.id);
    return spot;
  }

  async getAllSpots() {
    const spots = await this.spotRepository.findAll({ include: { all: true } });
    return spots;
  }

  async getAvaliableSpotForTransport(transportType: number) {
    const spots = await this.spotRepository.findAll({
      include: [
        {
          model: Transport,
          attributes: [],
        },
      ],
      group: ['Spot.id'],
      having: Sequelize.where(
        Sequelize.literal(
          '"Spot"."type" - COALESCE(SUM("transports"."type"), 0)',
        ),
        { [Op.gte]: transportType },
      ),
      order: ['type', 'id'],
    });

    return spots;
  }

  async updateSpot(dto: UpdateSpotDto) {
    const spot = await this.getSpotById(dto.id);
    this.checkTransportOnSpot(spot?.transports);

    spot.size = SPOT_SIZE[dto.type];
    await spot.save();

    return spot;
  }

  async deleteSpot(dto: DeleteSpotDto) {
    const spot = await this.getSpotById(dto.id);
    this.checkTransportOnSpot(spot?.transports);

    await spot.destroy();

    return spot;
  }

  private async getSpotById(id: number) {
    const spot = await this.spotRepository.findByPk(id, {
      include: { all: true },
    });

    if (!spot) {
      throw new BadRequestException(`No spot with id = '${id}' in parking`);
    }

    return spot;
  }

  private checkTransportOnSpot(transports) {
    if (transports.length > 0) {
      throw new BadRequestException(
        `You can't manipulate with spot, because there is some transport on spot`,
      );
    }
  }
}
