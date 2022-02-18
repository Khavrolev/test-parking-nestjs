import { IsString } from 'class-validator';

export class ParkTransportDto {
  @IsString({ message: `Field 'type' must be string` })
  readonly type: string;

  @IsString({ message: `Field 'plate' must be string` })
  readonly plate: string;
}
