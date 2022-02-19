import { IsString } from 'class-validator';

export class GetTransportDto {
  @IsString({ message: `Field 'plate' must be string` })
  readonly plate: string;
}
