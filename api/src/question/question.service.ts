import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { CreateQuestion, Question } from 'libs/dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      include: {
        answer: true,
      },
    })

    return questions
  }

  async getOne(id: string): Promise<Question> {
    try {
      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new NotFoundException('ID is not valid')
      }

      const foundQuestion = await this.prisma.question.findUnique({
        where: {
          id,
        },
        include: {
          answer: true,
        },
      })

      if (!foundQuestion) {
        throw new NotFoundException('Question is not found')
      }

      return foundQuestion
    } catch (err) {
      throw err
    }
  }

  async destroy(id: string) {
    try {
      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new NotFoundException('ID is not valid')
      }

      const foundQuestion = await this.prisma.question.findUnique({
        where: {
          id,
        },
      })

      if (!foundQuestion) {
        throw new NotFoundException('Question is not found')
      }

      await this.prisma.answer.delete({
        where: {
          questionId: id,
        },
      })

      await this.prisma.question.delete({
        where: {
          id,
        },
      })

      return {
        message: 'Success Deleted',
        deletedId: foundQuestion.id,
      }
    } catch (err) {
      throw err
    }
  }

  async create(dto: CreateQuestion): Promise<Question> {
    try {
      const question = await this.prisma.question.create({
        data: {
          question: dto.question.toLowerCase(),
          options: [...dto.options, dto.answer.toLowerCase()],
          answer: {
            create: {
              answer: dto.answer.toLowerCase(),
            },
          },
        },
        include: {
          answer: true,
        },
      })

      return question
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2003') {
          throw new NotFoundException(`Not found ID on ${err.meta?.field_name}`)
        }
        if (err.code === 'P2002') {
          throw new ForbiddenException(`Field must be unique`)
        }
      }
      throw err
    }
  }

  async update(id: string, dto: Omit<CreateQuestion, 'answer'>): Promise<Question> {
    try {
      if (!/^[0-9a-fA-F]{24}$/.test(id)) {
        throw new NotFoundException('ID is not valid')
      }

      const foundQuestion = await this.prisma.question.findUnique({
        where: {
          id,
        },
        include: {
          answer: true,
        },
      })

      if (!foundQuestion) {
        throw new NotFoundException('Question is not found')
      }

      const updatedQuestion = await this.prisma.question.update({
        where: { id },
        data: {
          question: dto.question.toLowerCase(),
          options: [...dto.options, foundQuestion.answer.answer.toLowerCase()],
        },
        include: {
          answer: true,
        },
      })

      return updatedQuestion
    } catch (err) {
      throw err
    }
  }
}
