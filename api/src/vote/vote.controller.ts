import { Controller, HttpCode, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { VoteService } from './vote.service'

@Controller('vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post(':id')
  vote(@Param('id') id: string) {
    return this.voteService.vote(id)
  }
}
