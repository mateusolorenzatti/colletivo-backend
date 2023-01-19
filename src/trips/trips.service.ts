import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

import { Trip } from './entities/trip.entity';
import { UpdateTripDto } from './dto/update-trip.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { RoutesService } from 'src/routes/routes.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private tripsRepository: Repository<Trip>,
    private routesService: RoutesService
  ) { }

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const route = await this.routesService.findOne(createTripDto.route)
    
    const trip = this.tripsRepository.create({
      route,
      service_id: createTripDto.service_id,
      trip_short_name: createTripDto.trip_short_name,
      trip_headsign: createTripDto.trip_headsign,
      direction_id: createTripDto.direction_id,
      block_id: createTripDto.block_id,
      bikes_allowed: createTripDto.bikes_allowed,
      wheelchair_accessible: createTripDto.wheelchair_accessible,
      trip_type: createTripDto.trip_type,
      drt_max_travel_time: createTripDto.drt_max_travel_time,
      drt_avg_travel_time: createTripDto.drt_avg_travel_time,
      drt_advance_book_min: createTripDto.drt_advance_book_min,
      drt_pickup_message: createTripDto.drt_pickup_message,
      drt_drop_off_message: createTripDto.drt_drop_off_message,
      continuous_pickup_message: createTripDto.continuous_pickup_message,
      continuous_drop_off_message: createTripDto.continuous_drop_off_message
    })

    await this.tripsRepository.save(trip)

    return trip
  }

  async findAll(): Promise<Trip[]> {
    return await this.tripsRepository.find()
  }

  async findOne(id: string): Promise<Trip> {
    let found = new Trip()

    try {
      found = await this.tripsRepository.findOne({ where: { id } })
    } catch (QueryFailedError) {
      throw new NotFoundException(`Trip with ID ${id} not found`)
    }

    if (!found)
      throw new NotFoundException(`Trip with ID ${id} not found`)

    return found
  }

  async update(id: string, updateTripDto: UpdateTripDto): Promise<Trip> {
    const trip = await this.findOne(id)
    const route = await this.routesService.findOne(updateTripDto.route)

    trip.route = route
    trip.service_id = updateTripDto.service_id,
    trip.trip_short_name = updateTripDto.trip_short_name,
    trip.trip_headsign = updateTripDto.trip_headsign,
    trip.direction_id = updateTripDto.direction_id,
    trip.block_id = updateTripDto.block_id,
    trip.bikes_allowed = updateTripDto.bikes_allowed,
    trip.wheelchair_accessible = updateTripDto.wheelchair_accessible,
    trip.trip_type = updateTripDto.trip_type,
    trip.drt_max_travel_time = updateTripDto.drt_max_travel_time,
    trip.drt_avg_travel_time = updateTripDto.drt_avg_travel_time,
    trip.drt_advance_book_min  = updateTripDto.drt_advance_book_min,
    trip.drt_pickup_message = updateTripDto.drt_pickup_message,
    trip.drt_drop_off_message = updateTripDto.drt_drop_off_message,
    trip.continuous_pickup_message = updateTripDto.continuous_pickup_message,
    trip.continuous_drop_off_message = updateTripDto.continuous_drop_off_message

    this.tripsRepository.save(trip)

    return trip
  }

  async remove(id: string): Promise<void> {
    let result
    
    try{
      result = await this.tripsRepository.delete(id)
    }catch (QueryFailedError){
      throw new NotFoundException(`Trip with ID ${id} not found`)
    }

    if (result.affected === 0)
      throw new NotFoundException(`Trip with ID ${id} not found`)
  }
}
