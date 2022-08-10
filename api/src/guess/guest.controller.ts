import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { GuestLogin } from 'libs/dto'
import { GuestService } from './guest.service'

@Controller('guest')
export class GuestController {
  constructor(private guestService: GuestService) {}

  @HttpCode(200)
  @Post('/login')
  login(@Res({ passthrough: true }) res: Response, @Body() dto: GuestLogin) {
    return this.guestService.login(res, dto)
  }
}
