import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';
import { Stop } from './entities/stop.entity';

@Injectable()
export class StopsService {
  constructor(
    @InjectRepository(Stop)
    private stopsRepository: Repository<Stop>
  ) { }

  async create(createStopDto: CreateStopDto): Promise<Stop> {
    const stop = this.stopsRepository.create({
      stop_code: createStopDto.stop_code,
      platform_code: createStopDto.platform_code,
      stop_name: createStopDto.stop_name,
      stop_desc: createStopDto.stop_desc,
      stop_lat: createStopDto.stop_lat,
      stop_lon: createStopDto.stop_lon,
      zone_id: createStopDto.zone_id,
      stop_url: createStopDto.stop_url,
      location_type: createStopDto.location_type,
      parent_station: createStopDto.parent_station,
      stop_timezone: createStopDto.stop_timezone,
      position: createStopDto.position,
      direction_id: createStopDto.direction_id,
      wheelchair_boarding: createStopDto.wheelchair_boarding
    })

    await this.stopsRepository.save(stop)

    return stop
  }

  async findAll(limit: number = 25): Promise<Stop[]> {
    const count = await this.stopsRepository.count()
    const randomIndex = Math.floor(Math.random() * count)

    return await this.stopsRepository.find({
      take: limit,
      skip: randomIndex
    })
  }

  async findOne(id: string): Promise<Stop> {
    let found = new Stop()

    try {
      found = await this.stopsRepository.findOne({ where: { id } })
    } catch (QueryFailedError) {
      throw new NotFoundException(`Stop with ID ${id} not found`)
    }

    if (!found)
      throw new NotFoundException(`Stop with ID ${id} not found`)

    return found
  }

  async update(id: string, updateStopDto: UpdateStopDto): Promise<Stop> {
    const stop = await this.findOne(id)

    stop.stop_code = updateStopDto.stop_code
    stop.platform_code = updateStopDto.platform_code
    stop.stop_name = updateStopDto.stop_name
    stop.stop_desc = updateStopDto.stop_desc
    stop.stop_lat = updateStopDto.stop_lat
    stop.stop_lon = updateStopDto.stop_lon
    stop.zone_id = updateStopDto.zone_id
    stop.stop_url = updateStopDto.stop_url
    stop.location_type = updateStopDto.location_type
    stop.parent_station = updateStopDto.parent_station
    stop.stop_timezone = updateStopDto.stop_timezone
    stop.position = updateStopDto.position
    stop.direction_id = updateStopDto.direction_id
    stop.wheelchair_boarding = updateStopDto.wheelchair_boarding

    this.stopsRepository.save(stop)

    return stop
  }

  async remove(id: string) {
    let result

    try {
      result = await this.stopsRepository.delete(id)
    } catch (QueryFailedError) {
      throw new NotFoundException(`Stop with ID ${id} not found`)
    }

    if (result.affected === 0)
      throw new NotFoundException(`Stop with ID ${id} not found`)
  }
}
