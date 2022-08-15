import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAdvice {
  @IsString()
  @IsNotEmpty()
  advice: string
}
