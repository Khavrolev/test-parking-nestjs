import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SPOT_SIZE } from 'src/constants/spots.constants';
import { CreateSpotDto } from './dto/create-spot.dto';
import { Spot } from './spots.model';

@Injectable()
export class SpotsService {
  constructor(@InjectModel(Spot) private spotRepository: typeof Spot) {}

  async create(dto: CreateSpotDto) {
    const input = { type: SPOT_SIZE[dto.type] };
    const spot = await this.spotRepository.create(input);
    return spot;
  }

  async init(arrDto: CreateSpotDto[]) {
    const input = arrDto.map((item) => {
      return { type: SPOT_SIZE[item.type] };
    });
    const spots = await this.spotRepository.bulkCreate(input);
    return spots;
  }
}
