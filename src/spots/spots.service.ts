import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SPOT_SIZE } from 'src/constants/spots.constants';
import { Transport } from 'src/transports/transports.model';
import { CreateSpotDto } from './dto/create-spot.dto';
import { GetSpotDto } from './dto/get-spot.dto';
import { RemoveSpotDto } from './dto/remove-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { Spot } from './spots.model';

@Injectable()
export class SpotsService {
  constructor(@InjectModel(Spot) private spotRepository: typeof Spot) {}

  async createSpot(dto: CreateSpotDto) {
    this.checkTypeFromEnum(dto.type);

    const input = { type: SPOT_SIZE[dto.type] };
    const spot = await this.spotRepository.create(input);

    return spot;
  }

  async createManySpots(arrDto: CreateSpotDto[]) {
    const input = arrDto.map((item) => {
      this.checkTypeFromEnum(item.type);
      return { type: SPOT_SIZE[item.type] };
    });

    const spots = await this.spotRepository.bulkCreate(input);

    return spots;
  }

  async getSpot(dto: GetSpotDto) {
    const spot = await this.getSpotById(dto.id, true);
    return spot;
  }

  async getAllSpots() {
    const spots = await this.spotRepository.findAll({ include: { all: true } });
    return spots;
  }

  async getSpotForTransport(transportType: number) {
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
    this.checkTypeFromEnum(dto.type);

    const spot = await this.getSpotById(dto.id, true);
    this.checkTransportOnSpot(spot?.transports);

    spot.type = SPOT_SIZE[dto.type];
    await spot.save();

    return spot;
  }

  async deleteSpot(dto: RemoveSpotDto) {
    const spot = await this.getSpotById(dto.id, true);
    this.checkTransportOnSpot(spot?.transports);

    await spot.destroy();

    return spot;
  }

  private checkTypeFromEnum(type: string) {
    if (!(type in SPOT_SIZE)) {
      throw new BadRequestException(`No '${type}' spot's type in parking`);
    }
  }

  private async getSpotById(id: number, includeTransport = false) {
    const spot = await this.spotRepository.findByPk(
      id,
      includeTransport
        ? {
            include: { all: true },
          }
        : undefined,
    );

    if (!spot) {
      throw new BadRequestException(`No spot with id = '${id}' in parking`);
    }

    return spot;
  }

  private checkTransportOnSpot(transports) {
    if (transports === undefined) {
      throw new BadRequestException(`Transport array is undefined`);
    }

    if (transports.length > 0) {
      throw new BadRequestException(
        `You can't mapipulate with spot, because there are some tronsport on spot`,
      );
    }
  }
}