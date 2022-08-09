import { Controller, Get } from '@nestjs/common'
import { App } from 'libs/dto/app'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): App {
    return this.appService.getHello()
  }
}
