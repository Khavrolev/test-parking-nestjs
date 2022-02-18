import { IsNumber, IsString } from 'class-validator';

export class UpdateSpotDto {
  @IsNumber({}, { message: `Field 'id' must be number` })
  readonly id: number;

  @IsString({ message: `Field 'type' must be string` })
  readonly type: string;
}
