import { IsNotEmpty, IsString } from 'class-validator'

export class GuestLogin {
  @IsString()
  @IsNotEmpty()
  question: string

  @IsString()
  @IsNotEmpty()
  answer: string
}
