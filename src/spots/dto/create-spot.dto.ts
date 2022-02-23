import { IsEnum } from 'class-validator';
import { SpotType } from '../../constants/spots.constants';

export class CreateSpotDto {
  @IsEnum(SpotType)
  readonly type: SpotType;
}
