import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { GuestLogin } from 'libs/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class GuestService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  private minute = 30

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

      const payload = {
        username: '@' + Math.random().toString(36).slice(2, 9),
        name: Math.random().toString(36).slice(2, 17).toUpperCase(),
      }

      const accessToken = await this.signToken(payload.username, 'guest')

      // const maxAge = new Date().setTime(new Date().getTime() + this.minute * 60 * 1000)
      const maxAge = this.minute * 60 * 1000

      res.cookie('access', accessToken, {
        maxAge,
        sameSite: 'strict',
        httpOnly: true,
        path: '/',
      })

      res.cookie('SSID', maxAge.toString(), {
        maxAge,
        sameSite: 'strict',
        path: '/',
      })

      return payload
    } catch (err) {
      throw err
    }
  }

  signToken(username: string, role: string): Promise<string> {
    const payload = {
      sub: username,
      role,
    }

    const expires = this.minute + 'm'

    return this.jwt.signAsync(payload, {
      expiresIn: expires,
      secret: process.env.SECRET_ACCESS_TOKEN,
    })
  }
}
