import { Injectable, NotFoundException } from '@nestjs/common'
import { Like } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class VoteService {
  constructor(private prisma: PrismaService) {}

  async vote(id: string): Promise<Like> {
    try {
      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new NotFoundException('ID is not valid')
      }

      const foundAdvice = await this.prisma.advice.findUnique({
        where: { id },
      })

      if (!foundAdvice) {
        throw new NotFoundException('Advice is not found')
      }

      const voted = await this.prisma.like.create({
        data: {
          adviceId: id,
        },
      })

      return voted
    } catch (err) {
      throw err
    }
  }
}
