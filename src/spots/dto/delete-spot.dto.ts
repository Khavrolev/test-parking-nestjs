import { IsNumberString } from 'class-validator';

export class DeleteSpotDto {
  @IsNumberString()
  readonly id: number;
}
