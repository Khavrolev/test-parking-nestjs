import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SPOT_SIZE } from 'src/constants/spots.constants';
import { Transport } from 'src/models/transports.model';
import { CreateSpotDto } from './dto/create-spot.dto';
import { GetSpotDto } from './dto/get-spot.dto';
import { RetrieveSpotDto } from './dto/retrieve-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { Spot } from '../models/spots.model';

@Injectable()
export class SpotsService {
  constructor(@InjectModel(Spot) private readonly spotModel: typeof Spot) {}

  async createSpot(dto: CreateSpotDto) {
    const input = { size: SPOT_SIZE[dto.type] };
    return await this.spotModel.create(input);
  }

  async createManySpots(dtos: CreateSpotDto[]) {
    const input = dtos.map((item) => {
      return { size: SPOT_SIZE[item.type] };
    });

    return await this.spotModel.bulkCreate(input);
  }

  async getSpot(dto: GetSpotDto) {
    return await this.getSpotById(dto.id);
  }

  async getAllSpots() {
    return await this.spotModel.findAll({ include: { all: true } });
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

    return await spot.save();
  }

  async retrieveSpot(dto: RetrieveSpotDto) {
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
