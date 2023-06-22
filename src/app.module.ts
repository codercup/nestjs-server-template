import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';

import { join } from 'path';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
