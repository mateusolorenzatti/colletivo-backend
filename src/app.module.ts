import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AgencyModule } from './agency/agency.module';
import { RoutesModule } from './routes/routes.module';
import { TripsModule } from './trips/trips.module';
import { ShapesModule } from './shapes/shapes.module';
import { StopsModule } from './stops/stops.module';
import { StopTimesModule } from './stop-times/stop-times.module';

@Module({
  imports: [
    AuthModule,
    
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_SERVER,
      port: parseInt(process.env.DB_SERVER_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
      entities: ["dist/**/*.entity{.ts,.js}"],
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    AgencyModule,
    RoutesModule,
    TripsModule,
    ShapesModule,
    StopsModule,
    StopTimesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
