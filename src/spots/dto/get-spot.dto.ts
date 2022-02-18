import { IsNumberString } from 'class-validator';

export class GetSpotDto {
  @IsNumberString({}, { message: `Field 'id' must be number` })
  readonly id: number;
}
