import { IsEnum, IsString } from 'class-validator';
import { TransportType } from 'src/constants/transports.constants';

export class ParkTransportDto {
  @IsString({ message: `Field 'type' must be string` })
  @IsEnum(TransportType, {
    message: `Value must be '${TransportType.m}' or '${TransportType.c}' or '${TransportType.b}'`,
  })
  readonly type: string;

  @IsString({ message: `Field 'plate' must be string` })
  readonly plate: string;
}
