import { IsArray, IsOptional, IsString } from 'class-validator'
import { GrantsDto } from './grants-role.dto'

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  label?: string

  @IsOptional()
  @IsArray()
  grants?: GrantsDto[]
}
