import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenSevice } from './token.service';

@Global()
@Module({
  imports: [JwtModule.register({})], //config will be implement in services
  providers: [TokenSevice],
  exports: [TokenSevice],
})
export class TokenModule {}
