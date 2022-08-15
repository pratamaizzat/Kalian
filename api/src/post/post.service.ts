import { Injectable } from '@nestjs/common'
import { Advice } from '@prisma/client'
import { CreateAdvice } from 'libs/dto/advice'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Advice[]> {
    const advices = await this.prisma.advice.findMany({
      orderBy: [
        {
          id: 'desc',
        },
      ],
      include: {
        likes: true,
      },
    })

    return advices
  }

  async createPost(username: string, dto: CreateAdvice): Promise<Advice> {
    const createdPost = await this.prisma.advice.create({
      data: {
        advice: dto.advice,
        upload_by: username,
      },
    })

    return createdPost
  }
}
