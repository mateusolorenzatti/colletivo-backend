import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { Stop } from 'src/stops/entities/stop.entity';
import { StopsService } from 'src/stops/stops.service';
import { Trip } from 'src/trips/entities/trip.entity';
import { TripsService } from 'src/trips/trips.service';
import { CreateStopTimeDto } from './dto/create-stop-time.dto';
import { UpdateStopTimeDto } from './dto/update-stop-time.dto';
import { StopTime } from './entities/stop-time.entity';

@Injectable()
export class StopTimesService {
  constructor(
    @InjectRepository(StopTime)
    private stopTimeRepository: Repository<StopTime>,
    private tripsService: TripsService,
    private stopsService: StopsService
  ) { }

  async create(createStopTimeDto: CreateStopTimeDto): Promise<StopTime> {
    const trip = await this.tripsService.findOne(createStopTimeDto.trip)
    const stop = await this.stopsService.findOne(createStopTimeDto.stop)

    const stopTime = this.stopTimeRepository.create({
      trip,
      stop,
      arrival_time: createStopTimeDto.arrival_time,
      departure_time: createStopTimeDto.departure_time,
      stop_sequence: createStopTimeDto.stop_sequence,
      stop_headsign: createStopTimeDto.stop_headsign,
      pickup_type: createStopTimeDto.pickup_type,
      drop_off_type: createStopTimeDto.drop_off_type,
      shape_dist_traveled: createStopTimeDto.shape_dist_traveled,
      timepoint: createStopTimeDto.timepoint,
      start_service_area_id: createStopTimeDto.start_service_area_id,  
      end_service_area_id: createStopTimeDto.end_service_area_id,
      start_service_area_radius: createStopTimeDto.start_service_area_radius,
      end_service_area_radius: createStopTimeDto.end_service_area_radius,
      continuous_pickup: createStopTimeDto.continuous_pickup,
      continuous_drop_off: createStopTimeDto.continuous_drop_off,
      pickup_area_id: createStopTimeDto.pickup_area_id,
      drop_off_area_id: createStopTimeDto.drop_off_area_id,
      pickup_service_area_radius: createStopTimeDto.pickup_service_area_radius,
      drop_off_service_area_radius: createStopTimeDto.drop_off_service_area_radius,
    })

    await this.stopTimeRepository.save(stopTime)

    return stopTime
  }

  async findAll(trip_id: string, stop_id: string): Promise<StopTime[]> {
    const query = this.stopTimeRepository.createQueryBuilder('stop_time')

    let trip: Trip
    let stop: Stop

    if(trip_id){
      trip = await this.tripsService.findOne(trip_id)
      query.andWhere({ trip })
    }

    if(stop_id){
      stop = await this.stopsService.findOne(stop_id)
      query.andWhere({ stop })
    }

    return await query.getMany()
  }

  async findOne(id: string): Promise<StopTime> {
    let found = new StopTime()

    try {
      found = await this.stopTimeRepository.findOne({ where: { id } })
    } catch (QueryFailedError) {
      throw new NotFoundException(`Stop-Time with ID ${id} not found`)
    }

    if (!found)
      throw new NotFoundException(`Stop-Time with ID ${id} not found`)

    return found
  }

  async update(id: string, updateStopTimeDto: UpdateStopTimeDto): Promise<StopTime> {
    const stopTime = await this.findOne(id)

    stopTime.arrival_time = updateStopTimeDto.arrival_time
    stopTime.departure_time = updateStopTimeDto.departure_time
    stopTime.stop_sequence = updateStopTimeDto.stop_sequence
    stopTime.stop_headsign = updateStopTimeDto.stop_headsign
    stopTime.pickup_type = updateStopTimeDto.pickup_type
    stopTime.drop_off_type = updateStopTimeDto.drop_off_type
    stopTime.shape_dist_traveled = updateStopTimeDto.shape_dist_traveled
    stopTime.timepoint = updateStopTimeDto.timepoint
    stopTime.start_service_area_id = updateStopTimeDto.start_service_area_id
    stopTime.end_service_area_id = updateStopTimeDto.end_service_area_id
    stopTime.start_service_area_radius = updateStopTimeDto.start_service_area_radius
    stopTime.end_service_area_radius = updateStopTimeDto.end_service_area_radius
    stopTime.continuous_pickup = updateStopTimeDto.continuous_pickup
    stopTime.continuous_drop_off = updateStopTimeDto.continuous_drop_off
    stopTime.pickup_area_id = updateStopTimeDto.pickup_area_id
    stopTime.drop_off_area_id = updateStopTimeDto.drop_off_area_id
    stopTime.pickup_service_area_radius = updateStopTimeDto.pickup_service_area_radius
    stopTime.drop_off_service_area_radius = updateStopTimeDto.drop_off_service_area_radius

    this.stopTimeRepository.save(stopTime)

    return stopTime
  }

  async remove(id: string): Promise<void>  {
    let result
    
    try{
      result = await this.stopTimeRepository.delete(id)
    }catch (QueryFailedError){
      throw new NotFoundException(`Stop-Time with ID ${id} not found`)
    }

    if (result.affected === 0)
      throw new NotFoundException(`Stop-Time with ID ${id} not found`)
  }
}
