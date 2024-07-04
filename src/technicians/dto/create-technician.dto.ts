import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsBoolean,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateTechnicianDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  specialization: string;

  @IsNotEmpty()
  @IsInt()
  experience: number;

  @IsNotEmpty()
  @IsBoolean()
  availability: boolean;
}

export class CreateTechniciansDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTechnicianDto)
  technicians: CreateTechnicianDto[];
}
