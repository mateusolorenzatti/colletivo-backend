import { IsBoolean, IsNumber, IsOptional, IsUUID, Matches } from "class-validator"

export class CreateTripDto {
    @IsUUID('all', { each: true })
    route: string

    service_id: string
    trip_short_name: string
    trip_headsign: string
    direction_id: string

    @IsOptional()
    @IsNumber()
    block_id?: number

    @IsOptional()
    @IsBoolean()
    bikes_allowed?: boolean

    @IsOptional()
    @IsBoolean()
    wheelchair_accessible?: boolean

    @IsOptional()
    @IsNumber()
    trip_type?: number
   
    @IsOptional()
    @IsNumber()
    drt_max_travel_time?: number
   
    @IsOptional()
    @IsNumber()
    drt_avg_travel_time?: number
    
    @IsOptional()
    @IsNumber()
    drt_advance_book_min?: number
    
    @IsOptional()
    @IsNumber()
    drt_pickup_message?: number
    
    @IsOptional()
    @IsNumber()
    drt_drop_off_message?: number

    @IsOptional()
    @IsNumber()
    continuous_pickup_message?: number

    @IsOptional()
    @IsNumber()
    continuous_drop_off_message?: number
}
