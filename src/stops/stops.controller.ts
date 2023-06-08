import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { StopsService } from './stops.service';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';
import { AuthGuard } from '@nestjs/passport';
import { Stop } from './entities/stop.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stops')
@Controller('stops')
@UseGuards(AuthGuard())
export class StopsController {
  constructor(private readonly stopsService: StopsService) {}

  @Post()
  create(@Body() createStopDto: CreateStopDto): Promise<Stop> {
    return this.stopsService.create(createStopDto)
  }

  @Get()
  findAll(): Promise<Stop[]> {
    return this.stopsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Stop> {
    return this.stopsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStopDto: UpdateStopDto): Promise<Stop> {
    return this.stopsService.update(id, updateStopDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.stopsService.remove(id)
  }
}
