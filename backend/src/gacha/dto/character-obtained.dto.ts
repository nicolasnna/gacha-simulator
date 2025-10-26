import { IsString } from 'class-validator'

export class CharacterObtainedDto {
  @IsString()
  anime: string

  @IsString()
  charId: string
}
