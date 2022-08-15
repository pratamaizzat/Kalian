import { Request } from 'express'
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PostService } from './post.service'
import { CreateAdvice } from 'libs/dto/advice'

@Controller('p')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getAll() {
    return this.postService.getAll()
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createPost(@Req() req: Request, @Body() dto: CreateAdvice) {
    const user = req.user as { sub: string }

    return this.postService.createPost(user.sub, dto)
  }
}
