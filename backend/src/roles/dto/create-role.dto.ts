import { IsOptional, IsString } from 'class-validator'
import { GrantsArrayDto } from './grants-role.dto'

export class CreateRoleDto extends GrantsArrayDto {
  @IsString()
  key!: string

  @IsOptional()
  label: string
}
