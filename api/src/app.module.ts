import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GuestModule } from './guess/guest.module'
import { PostModule } from './post/post.module'
import { PrismaModule } from './prisma/prisma.module'
import { QuestionModule } from './question/question.module'
import { VoteModule } from './vote/vote.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    PrismaModule,
    QuestionModule,
    GuestModule,
    PostModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
