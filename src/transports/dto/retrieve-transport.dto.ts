import { IsString } from 'class-validator';

export class RetrieveTransportDto {
  @IsString()
  readonly plate: string;
}
