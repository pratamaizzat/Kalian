import { ArrayNotEmpty, IsNotEmpty, IsString } from 'class-validator'
import { Question as QuestionScheme, Answer } from '@prisma/client'

export class CreateQuestion {
  @IsString()
  @IsNotEmpty()
  question: string

  @IsString()
  @IsNotEmpty()
  answer: string

  @ArrayNotEmpty()
  options: string[]
}

export type Question = QuestionScheme & {
  answer: Answer
}
