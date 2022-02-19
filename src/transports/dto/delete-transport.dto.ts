import { IsString } from 'class-validator';

export class DeleteTransportDto {
  @IsString({ message: `Field 'plate' must be string` })
  readonly plate: string;
}
