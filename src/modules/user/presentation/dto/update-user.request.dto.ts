import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiPropertyOptional({ type: String, nullable: true })
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string | null;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  userName?: string | null;
}
