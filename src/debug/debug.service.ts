import { Injectable } from '@nestjs/common';
import { SpotType } from '../constants/spots.constants';
import { SpotsService } from '../spots/spots.service';

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
        initSpots.push({ type });
      }
    }

    return this.spotsService.createManySpots(initSpots);
  }
}
