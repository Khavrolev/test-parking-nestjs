import { IsString } from 'class-validator';

export class CreateSpotDto {
  @IsString({ message: `Field 'type' must be string` })
  readonly type: string;
}
