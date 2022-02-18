import { IsNumberString } from 'class-validator';

export class RemoveSpotDto {
  @IsNumberString({}, { message: `Field 'id' must be number` })
  readonly id: number;
}
