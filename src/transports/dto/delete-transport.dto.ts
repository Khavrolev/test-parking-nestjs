import { IsString } from 'class-validator';

export class DeleteTransportDto {
  @IsString()
  readonly plate: string;
}
