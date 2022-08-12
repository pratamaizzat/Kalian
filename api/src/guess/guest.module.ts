import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'apps/utils/strategy'
import { GuestController } from './guest.controller'
import { GuestService } from './guest.service'

@Module({
  imports: [JwtModule.register({})],
  controllers: [GuestController],
  providers: [GuestService, JwtStrategy],
})
export class GuestModule {}
