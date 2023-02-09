import { forwardRef, Module } from '@nestjs/common';
import { ShapesService } from './shapes.service';
import { ShapesController } from './shapes.controller';
import { Shape } from './entities/shape.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Shape]),

    forwardRef(() => AuthModule),
  ],
  controllers: [ShapesController],
  providers: [ShapesService]
})
export class ShapesModule {}
