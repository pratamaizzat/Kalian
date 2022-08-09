import { Injectable } from '@nestjs/common'
import { App } from 'libs/dto/app'

@Injectable()
export class AppService {
  getHello(): App {
    return {
      status: true,
      statusText: 'OK',
      data: {
        message: 'Welcome to KALIAN API',
      },
    }
  }
}
