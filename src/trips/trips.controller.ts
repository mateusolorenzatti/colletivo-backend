import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('trips')
@UseGuards(AuthGuard())
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto): Promise<Trip> {
    return this.tripsService.create(createTripDto)
  }

  @Get()
  findAll(): Promise<Trip[]> {
    return this.tripsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Trip> {
    return this.tripsService.findOne(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto): Promise<Trip> {
    return this.tripsService.update(id, updateTripDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tripsService.remove(id)
  }
}
