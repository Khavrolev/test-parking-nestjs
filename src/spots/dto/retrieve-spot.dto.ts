import { IsNumberString } from 'class-validator';

export class RetrieveSpotDto {
  @IsNumberString({}, { message: `Field 'id' must be number` })
  readonly id: number;
}
