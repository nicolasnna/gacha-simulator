import { ActionKeyEnum, ActionType, ModuleKeyEnum } from '@common/enums'
import { Type } from 'class-transformer'
import { IsArray, IsEnum, IsNotEmpty, ValidateNested } from 'class-validator'

export class GrantsDto {
  @IsNotEmpty()
  @IsEnum(ModuleKeyEnum)
  module: ModuleKeyEnum

  @IsArray()
  @IsEnum(ActionKeyEnum, { each: true })
  actions: ActionType[]
}

export class GrantsArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GrantsDto)
  grants: GrantsDto[]
}
