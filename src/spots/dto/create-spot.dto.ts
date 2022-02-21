import { IsEnum } from 'class-validator';
import { SpotType } from 'src/constants/spots.constants';

export class CreateSpotDto {
  @IsEnum(SpotType)
  readonly type: SpotType;
}
