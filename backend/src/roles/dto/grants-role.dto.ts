import { ActionKeyEnum, ActionType, ModuleKeyEnum } from '@common/enums'
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator'

export class GrantsDto {
  @IsNotEmpty()
  @IsEnum(ModuleKeyEnum)
  module: ModuleKeyEnum

  @IsArray()
  @IsEnum(ActionKeyEnum, { each: true })
  actions: ActionType[]
}
