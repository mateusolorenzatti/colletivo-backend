import { IsNumber, IsOptional, IsUUID, Matches } from "class-validator"

export class CreateStopTimeDto {
    @IsUUID('all', { each: true })
    trip: string
    
    @IsUUID('all', { each: true })
    stop: string

    @IsOptional()
    @Matches(
        /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/,
        { message: 'arrival_time must be on format HH:MM:SS' }
    )
    arrival_time: string
    
    @IsOptional()
    @Matches(
        /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/,
        { message: 'departure_time must be on format HH:MM:SS' }
    )
    departure_time: string
    
    @IsNumber()
    stop_sequence: number
    
    @IsOptional()
    stop_headsign: string

    @IsOptional()
    @IsNumber()
    pickup_type: number

    @IsOptional()
    @IsNumber()
    drop_off_type: number

    @IsOptional()
    @IsNumber()
    shape_dist_traveled: number

    @IsOptional()
    @IsNumber()
    timepoint: number

    @IsOptional()
    start_service_area_id: string  

    @IsOptional()
    end_service_area_id: string

    @IsOptional()
    start_service_area_radius: string

    @IsOptional()
    end_service_area_radius: string

    @IsOptional()
    continuous_pickup: string

    @IsOptional()
    continuous_drop_off: string

    @IsOptional()
    pickup_area_id: string

    @IsOptional()
    drop_off_area_id: string

    @IsOptional()
    pickup_service_area_radius: string

    @IsOptional()
    drop_off_service_area_radius: string
}
