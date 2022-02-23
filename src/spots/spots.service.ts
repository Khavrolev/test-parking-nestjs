import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateSpotDto } from './dto/create-spot.dto';
import { GetSpotDto } from './dto/get-spot.dto';
import { DeleteSpotDto } from './dto/delete-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { Spot } from '../models/spots.model';
import { SPOT_SIZE } from '../constants/spots.constants';
import { Transport } from '../models/transports.model';

@Injectable()
export class SpotsService {
  constructor(@InjectModel(Spot) private readonly spotModel: typeof Spot) {
    console.log('SpotsService');
  }

  async createSpot(dto: CreateSpotDto) {
    const input = { size: SPOT_SIZE[dto.type] };
    return this.spotModel.create(input);
  }

  async createManySpots(dtos: CreateSpotDto[]) {
    const input = dtos.map((item) => {
      return { size: SPOT_SIZE[item.type] };
    });

    return this.spotModel.bulkCreate(input);
  }

  async getSpot(dto: GetSpotDto) {
    return this.getSpotById(dto.id);
  }

  async getAllSpots() {
    return this.spotModel.findAll({ include: { all: true } });
  }

  async getAvaliableSpotForTransport(transportType: number) {
    return await this.spotModel.findAll({
      include: [
        {
          model: Transport,
          attributes: [],
        },
      ],
      group: ['Spot.id'],
      having: Sequelize.where(
        Sequelize.literal(
          '"Spot"."size" - COALESCE(SUM("transports"."size"), 0)',
        ),
        { [Op.gte]: transportType },
      ),
      order: ['size', 'id'],
    });
  }

  async updateSpot(dto: UpdateSpotDto) {
    const spot = await this.getSpotById(dto.id);
    this.checkTransportOnSpot(spot?.transports);

    spot.size = SPOT_SIZE[dto.type];

    return spot.save();
  }

  async deleteSpot(dto: DeleteSpotDto) {
    const spot = await this.getSpotById(dto.id);
    this.checkTransportOnSpot(spot?.transports);

    await spot.destroy();

    return spot;
  }

  private async getSpotById(id: number) {
    const spot = await this.spotModel.findByPk(id, {
      include: { all: true },
    });

    if (!spot) {
      throw new NotFoundException(`No spot with id = '${id}' in parking`);
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
