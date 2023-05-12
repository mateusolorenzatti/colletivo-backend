import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TripsService } from 'src/trips/trips.service';
import { Repository } from "typeorm";

import { CreateShapeDto } from './dto/create-shape.dto';
import { UpdateShapeDto } from './dto/update-shape.dto';
import { Shape } from './entities/shape.entity';

@Injectable()
export class ShapesService {
  constructor(
    @InjectRepository(Shape)
    private shapesRepository: Repository<Shape>,
    private tripsService: TripsService
  ) { }

  async create(createShapeDto: CreateShapeDto): Promise<Shape> {
    const existingShape = await this.shapesRepository.findOne({ 
      where: { 
        shape_id: createShapeDto.shape_id,
        pt_sequence: createShapeDto.pt_sequence
      } 
    })

    if (existingShape) 
      throw new ConflictException(`Shape with ID ${createShapeDto.shape_id} and sequence ${createShapeDto.pt_sequence} already exists`)

    const trip = await this.tripsService.findOne(createShapeDto.trip)

    const shape = this.shapesRepository.create({
      trip,
      shape_id: createShapeDto.shape_id,
      pt_sequence: createShapeDto.pt_sequence,
      pt_lat: createShapeDto.pt_lat,
      pt_lon: createShapeDto.pt_lon,
      dist_traveled: createShapeDto.dist_traveled
    })

    try{
      await this.shapesRepository.save(shape)
    }catch(QueryFailedError){
      throw new ConflictException(`Shape with ID ${createShapeDto.shape_id} and sequence ${createShapeDto.pt_sequence} already exists`)
    }

    return shape
  }

  async findAll(shape_id: string): Promise<Shape[]> {
    if(shape_id)
      return await this.shapesRepository.find({ where: { shape_id } })

    return await this.shapesRepository.find()
  }

  async findOne(id: string): Promise<Shape> {
    let found = new Shape()

    try {
      found = await this.shapesRepository.findOne({ where: { id } })
    } catch (QueryFailedError) {
      throw new NotFoundException(`Shape with ID ${id} not found`)
    }

    if (!found)
      throw new NotFoundException(`Shape with ID ${id} not found`)

    return found
  }

  async update(id: string, updateShapeDto: UpdateShapeDto): Promise<Shape> {
    const shape = await this.findOne(id)

    shape.pt_lat = updateShapeDto.pt_lat
    shape.pt_lon = updateShapeDto.pt_lon
    shape.dist_traveled = updateShapeDto.dist_traveled

    this.shapesRepository.save(shape)

    return shape
  }

  async remove(id: string): Promise<void> {
    let result
    
    try{
      result = await this.shapesRepository.delete(id)
    }catch (QueryFailedError){
      throw new NotFoundException(`Shape with ID ${id} not found`)
    }

    if (result.affected === 0)
      throw new NotFoundException(`Shape with ID ${id} not found`)
  }
}
