import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { Agency } from './entities/agency.entity';

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
  ) { }

  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    const agency = this.agencyRepository.create({
      name: createAgencyDto.name,
      phone: createAgencyDto.phone,
      lang: createAgencyDto.lang,
      timezone: createAgencyDto.timezone,
      url: createAgencyDto.url,
      fare_url: createAgencyDto.fare_url
    })

    await this.agencyRepository.save(agency)

    return agency
  }

  async findAll(): Promise<Agency[]> {
    return await this.agencyRepository.find()
  }

  async findOne(id: string): Promise<Agency> {
    let found = new Agency()

    try {
      found = await this.agencyRepository.findOne({ where: { id } })
    } catch (QueryFailedError) {
      throw new NotFoundException(`Agency with ID ${id} not found`)
    }

    if (!found)
      throw new NotFoundException(`Agency with ID ${id} not found`)

    return found
  }

  async update(id: string, updateAgencyDto: UpdateAgencyDto): Promise<Agency> {
    const agency = await this.findOne(id)

    agency.name = updateAgencyDto.name
    agency.phone = updateAgencyDto.phone
    agency.lang = updateAgencyDto.lang
    agency.timezone = updateAgencyDto.timezone
    agency.url = updateAgencyDto.url
    agency.fare_url = updateAgencyDto.fare_url

    await this.agencyRepository.save(agency)

    return agency
  }

  async remove(id: string): Promise<void> {
    let result
    
    try{
      result = await this.agencyRepository.delete(id)
    }catch (QueryFailedError){
      throw new NotFoundException(`Agency with ID ${id} not found`)
    }

    if (result.affected === 0)
      throw new NotFoundException(`Agency with ID ${id} not found`)
  }

}
