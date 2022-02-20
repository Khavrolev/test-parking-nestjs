import { IsEnum, IsNumber, IsString } from 'class-validator';
import { SpotType } from 'src/constants/spots.constants';

export class UpdateSpotDto {
  @IsNumber({}, { message: `Field 'id' must be number` })
  readonly id: number;

  @IsString({ message: `Field 'type' must be string` })
  @IsEnum(SpotType, {
    message: `Value must be '${SpotType.l}' or '${SpotType.m}' or '${SpotType.l}'`,
  })
  readonly type: string;
}
