import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities/route.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Routes')
@Controller('routes')
@UseGuards(AuthGuard())
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() createRouteDto: CreateRouteDto): Promise<Route> {
    return this.routesService.create(createRouteDto);
  }

  @Get()
  findAll(): Promise<Route[]> {
    return this.routesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Route> {
    return this.routesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto): Promise<Route>{
    return this.routesService.update(id, updateRouteDto);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string
  ): Promise<void> {
    return this.routesService.remove(id);
  }
}
