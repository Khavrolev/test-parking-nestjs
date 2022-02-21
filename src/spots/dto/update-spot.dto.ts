import { IsEnum, IsNumber } from 'class-validator';
import { SpotType } from 'src/constants/spots.constants';

export class UpdateSpotDto {
  @IsNumber()
  readonly id: number;

  @IsEnum(SpotType)
  readonly type: SpotType;
}
