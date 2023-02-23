import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put, Query } from '@nestjs/common';
import { StopTimesService } from './stop-times.service';
import { CreateStopTimeDto } from './dto/create-stop-time.dto';
import { UpdateStopTimeDto } from './dto/update-stop-time.dto';
import { AuthGuard } from '@nestjs/passport';
import { StopTime } from './entities/stop-time.entity';

@Controller('stop-times')
@UseGuards(AuthGuard())
export class StopTimesController {
  constructor(private readonly stopTimesService: StopTimesService) {}

  @Post()
  create(@Body() createStopTimeDto: CreateStopTimeDto): Promise<StopTime> {
    return this.stopTimesService.create(createStopTimeDto)
  }

  @Get()
  findAll(
    @Query('trip') trip: string,
    @Query('stop') stop: string
  ): Promise<StopTime[]> {
    return this.stopTimesService.findAll(trip, stop)
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StopTime> {
    return this.stopTimesService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStopTimeDto: UpdateStopTimeDto): Promise<StopTime> {
    return this.stopTimesService.update(id, updateStopTimeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.stopTimesService.remove(id)
  }
}
