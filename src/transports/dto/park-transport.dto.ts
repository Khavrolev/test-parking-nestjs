import { IsEnum, IsString } from 'class-validator';
import { TransportType } from 'src/constants/transports.constants';

export class ParkTransportDto {
  @IsEnum(TransportType, {
    message: `Value must be '${TransportType.motocycle}' or '${TransportType.car}' or '${TransportType.bus}'`,
  })
  readonly type: TransportType;

  @IsString({ message: `Field 'plate' must be string` })
  readonly plate: string;
}
