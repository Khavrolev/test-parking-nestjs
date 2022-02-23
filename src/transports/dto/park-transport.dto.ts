import { IsEnum, IsString } from 'class-validator';
import { TransportType } from '../../constants/transports.constants';

export class ParkTransportDto {
  @IsEnum(TransportType)
  readonly type: TransportType;

  @IsString()
  readonly plate: string;
}
