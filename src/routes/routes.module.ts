import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoutesController } from './routes.controller';
import { Route } from './entities/route.entity';
import { RoutesService } from './routes.service';
import { AuthModule } from 'src/auth/auth.module';
import { AgencyModule } from 'src/agency/agency.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route]),

    forwardRef(() => AuthModule),
    forwardRef(() => AgencyModule),
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
  exports: [RoutesService]
})
export class RoutesModule {}
