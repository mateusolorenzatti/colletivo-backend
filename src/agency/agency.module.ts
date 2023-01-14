import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Agency } from './entities/agency.entity';
import { AgencyController } from './agency.controller';
import { AgencyService } from './agency.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agency]),

    forwardRef(() => AuthModule),
  ],
  controllers: [AgencyController],
  providers: [AgencyService]
})
export class AgencyModule {}
