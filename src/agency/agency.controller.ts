import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AgencyService } from './agency.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';
import { Agency } from './entities/agency.entity';

@Controller('agency')
@UseGuards(AuthGuard())
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post()
  create(@Body() createAgencyDto: CreateAgencyDto): Promise<Agency> {
    return this.agencyService.create(createAgencyDto)
  }

  @Get()
  findAll(): Promise<Agency[]> {
    return this.agencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Agency> {
    return this.agencyService.findOne(id)
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updateAgencyDto: UpdateAgencyDto
  ): Promise<Agency> {
    return this.agencyService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.agencyService.remove(id)
  }
}
