import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ReceitaModule } from './receita/receita.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, ReceitaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
