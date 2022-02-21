import { IsNumberString } from 'class-validator';

export class RetrieveSpotDto {
  @IsNumberString()
  readonly id: number;
}
