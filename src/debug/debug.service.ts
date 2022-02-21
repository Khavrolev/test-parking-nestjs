import { Injectable } from '@nestjs/common';
import { SpotType } from 'src/constants/spots.constants';
import { SpotsService } from 'src/spots/spots.service';

const SPOTS_AMOUNT = {
  [SpotType.small]: 3,
  [SpotType.medium]: 5,
  [SpotType.large]: 3,
};

@Injectable()
export class DebugService {
  constructor(private readonly spotsService: SpotsService) {}

  async init() {
    const initSpots = [];
    for (const type in SPOTS_AMOUNT) {
      for (let i = 0; i < SPOTS_AMOUNT[type]; i++) {
        initSpots.push({ type: type });
      }
    }

    const spots = await this.spotsService.createManySpots(initSpots);

    return spots;
  }
}
