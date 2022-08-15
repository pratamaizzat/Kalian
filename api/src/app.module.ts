import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GuestModule } from './guess/guest.module'
import { PostModule } from './post/post.module'
import { PrismaModule } from './prisma/prisma.module'
import { QuestionModule } from './question/question.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    PrismaModule,
    QuestionModule,
    GuestModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
