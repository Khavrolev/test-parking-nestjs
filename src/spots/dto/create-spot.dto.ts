import { IsEnum, IsString } from 'class-validator';
import { SpotType } from 'src/constants/spots.constants';

export class CreateSpotDto {
  @IsString({ message: `Field 'type' must be string` })
  @IsEnum(SpotType, {
    message: `Value must be '${SpotType.small}' or '${SpotType.medium}' or '${SpotType.large}'`,
  })
  readonly type: SpotType;
}
