import { forwardRef, Module } from '@nestjs/common';
import { StopsService } from './stops.service';
import { StopsController } from './stops.controller';
import { Stop } from './entities/stop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { StopTimesModule } from 'src/stop-times/stop-times.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stop]),

    forwardRef(() => AuthModule),
    forwardRef(() => StopTimesModule),
  ],
  controllers: [StopsController],
  providers: [StopsService],
  exports: [StopsService]
})
export class StopsModule {}
