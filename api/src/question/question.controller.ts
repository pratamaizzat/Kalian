import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateQuestion } from 'libs/dto'
import { QuestionService } from './question.service'

@Controller('q')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  getAll() {
    return this.questionService.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.questionService.getOne(id)
  }

  @Post()
  create(@Body() dto: CreateQuestion) {
    return this.questionService.create(dto)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Omit<CreateQuestion, 'answer'>) {
    return this.questionService.update(id, dto)
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.questionService.destroy(id)
  }
}
