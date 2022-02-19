import { IsNumberString } from 'class-validator';

export class DeleteSpotDto {
  @IsNumberString({}, { message: `Field 'id' must be number` })
  readonly id: number;
}
