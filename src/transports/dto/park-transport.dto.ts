import { IsEnum, IsString } from 'class-validator';
import { TransportType } from 'src/constants/transports.constants';

export class ParkTransportDto {
  @IsEnum(TransportType)
  readonly type: TransportType;

  @IsString()
  readonly plate: string;
}
