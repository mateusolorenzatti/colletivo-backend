import { forwardRef, Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { Trip } from './entities/trip.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { RoutesModule } from 'src/routes/routes.module';
import { StopTimesModule } from 'src/stop-times/stop-times.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip]),

    forwardRef(() => AuthModule),
    forwardRef(() => RoutesModule),
    forwardRef(() => StopTimesModule),
  ],
  controllers: [TripsController],
  providers: [TripsService],
  exports: [TripsService]
})
export class TripsModule {}
