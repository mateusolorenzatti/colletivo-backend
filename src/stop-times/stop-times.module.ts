import { forwardRef, Module } from '@nestjs/common';
import { StopTimesService } from './stop-times.service';
import { StopTimesController } from './stop-times.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StopTime } from './entities/stop-time.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TripsModule } from 'src/trips/trips.module';
import { StopsModule } from 'src/stops/stops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StopTime]),

    forwardRef(() => AuthModule),
    forwardRef(() => TripsModule),
    forwardRef(() => StopsModule),
  ],
  controllers: [StopTimesController],
  providers: [StopTimesService],
  exports: [StopTimesService]
})
export class StopTimesModule {}
