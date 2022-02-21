import { IsNumberString } from 'class-validator';

export class GetSpotDto {
  @IsNumberString()
  readonly id: number;
}
