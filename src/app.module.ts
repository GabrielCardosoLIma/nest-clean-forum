import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAcoountController } from './controllers/create-account.controller';

@Module({
  imports: [],
  controllers: [CreateAcoountController],
  providers: [PrismaService],
})
export class AppModule {}
