import { IsString } from 'class-validator';

export class GetTransportDto {
  @IsString()
  readonly plate: string;
}
