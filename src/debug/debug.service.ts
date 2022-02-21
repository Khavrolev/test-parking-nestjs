import { Injectable } from '@nestjs/common';
import { SPOTS_AMOUNT, SpotType } from 'src/constants/spots.constants';
import { SpotsService } from 'src/spots/spots.service';

@Injectable()
export class DebugService {
  constructor(private readonly spotsService: SpotsService) {}

  async init() {
    const initSpots = [];
    for (const key in SPOTS_AMOUNT) {
      for (let i = 0; i < SPOTS_AMOUNT[key]; i++) {
        initSpots.push({ type: [SpotType[key]] });
      }
    }

    const spots = await this.spotsService.createManySpots(initSpots);

    return spots;
  }
}
