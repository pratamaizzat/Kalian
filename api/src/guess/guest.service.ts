import { BadRequestException, Injectable } from '@nestjs/common'
import { generateAccessToken } from 'apps/utils/generateToken'
import { Response } from 'express'
import { GuestLogin } from 'libs/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GuestService {
  constructor(private prisma: PrismaService) {}

  async login(res: Response, dto: GuestLogin) {
    try {
      const foundQuestion = await this.prisma.question.findUnique({
        where: { question: dto.question.toLowerCase() },
      })

      if (!foundQuestion) {
        throw new BadRequestException('Invalid given question')
      }

      const foundAnswer = await this.prisma.answer.findFirst({
        where: {
          answer: dto.answer.toLowerCase(),
        },
      })

      if (!foundAnswer) {
        throw new BadRequestException('Invalid given answer')
      }

      if (foundAnswer.questionId !== foundQuestion.id) {
        throw new BadRequestException('Wrong Answer. Please read carefully')
      }

      res.cookie('access', generateAccessToken('guest'), {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      })

      return {
        username: '@' + Math.random().toString(36).slice(2, 9),
        name: Math.random().toString(36).slice(2, 17).toUpperCase(),
      }
    } catch (err) {
      throw err
    }
  }
}
