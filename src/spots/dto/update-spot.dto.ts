import { IsEnum, IsNumber } from 'class-validator';
import { SpotType } from 'src/constants/spots.constants';

export class UpdateSpotDto {
  @IsNumber({}, { message: `Field 'id' must be number` })
  readonly id: number;

  @IsEnum(SpotType, {
    message: `Value must be '${SpotType.l}' or '${SpotType.m}' or '${SpotType.l}'`,
  })
  readonly type: string;
}
