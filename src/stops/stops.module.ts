import { forwardRef, Module } from '@nestjs/common';
import { StopsService } from './stops.service';
import { StopsController } from './stops.controller';
import { Stop } from './entities/stop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stop]),

    forwardRef(() => AuthModule),
  ],
  controllers: [StopsController],
  providers: [StopsService],
  exports: [StopsService]
})
export class StopsModule {}
