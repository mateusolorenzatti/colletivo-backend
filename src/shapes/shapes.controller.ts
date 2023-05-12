import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { ShapesService } from './shapes.service';
import { CreateShapeDto } from './dto/create-shape.dto';
import { UpdateShapeDto } from './dto/update-shape.dto';
import { AuthGuard } from '@nestjs/passport';
import { Shape } from './entities/shape.entity';

@Controller('shapes')
@UseGuards(AuthGuard())
export class ShapesController {
  constructor(private readonly shapesService: ShapesService) {}

  @Post()
  create(@Body() createShapeDto: CreateShapeDto): Promise<Shape> {
    return this.shapesService.create(createShapeDto);
  }

  @Get()
  findAll(@Query('shape_id') shape_id: string): Promise<Shape[]> {
    return this.shapesService.findAll(shape_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Shape> {
    return this.shapesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShapeDto: UpdateShapeDto): Promise<Shape> {
    return this.shapesService.update(id, updateShapeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.shapesService.remove(id);
  }
}
