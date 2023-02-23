import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities/route.entity';

import { AgencyService } from 'src/agency/agency.service';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private routesRepository: Repository<Route>,
    private agencyService: AgencyService
  ) { }

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    const agency = await this.agencyService.findOne(createRouteDto.agency)

    const route = this.routesRepository.create({
      agency,
      short_name: createRouteDto.short_name,
      long_name: createRouteDto.long_name,
      desc: createRouteDto.desc,
      type: createRouteDto.type,
      url: createRouteDto.url,
      color: createRouteDto.color, 
      text_color: createRouteDto.text_color,
      sort_order: createRouteDto.sort_order,
      min_headway_minutes: createRouteDto.min_headway_minutes,
      eligibility_restricted: createRouteDto.eligibility_restricted
    })

    await this.routesRepository.save(route)

    return route
  }

  async findAll(): Promise<Route[]> {
    return await this.routesRepository.find()
  }

  async findOne(id: string): Promise<Route> {
    let found = new Route()

    try {
      found = await this.routesRepository.findOne({ where: { id } })
    } catch (QueryFailedError) {
      throw new NotFoundException(`Route with ID ${id} not found`)
    }

    if (!found)
      throw new NotFoundException(`Route with ID ${id} not found`)

    return found
  }

  async update(id: string, updateRouteDto: UpdateRouteDto): Promise<Route> {
    const route = await this.findOne(id)
    const agency = await this.agencyService.findOne(updateRouteDto.agency)

    route.agency = agency
    route.short_name = updateRouteDto.short_name
    route.long_name = updateRouteDto.long_name
    route.desc = updateRouteDto.desc
    route.type = updateRouteDto.type
    route.url = updateRouteDto.url
    route.color = updateRouteDto.color
    route.text_color = updateRouteDto.text_color
    route.sort_order = updateRouteDto.sort_order
    route.min_headway_minutes = updateRouteDto.min_headway_minutes
    route.eligibility_restricted = updateRouteDto.eligibility_restricted

    this.routesRepository.save(route)

    return route
  }

  async remove(id: string): Promise<void> {
    let result
    
    try{
      result = await this.routesRepository.delete(id)
    }catch (QueryFailedError){
      throw new NotFoundException(`Route with ID ${id} not found`)
    }

    if (result.affected === 0)
      throw new NotFoundException(`Route with ID ${id} not found`)
  }
}
