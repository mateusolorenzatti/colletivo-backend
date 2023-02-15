import { IsLatitude, IsLatLong, IsLongitude, IsNumber, IsOptional, Length } from "class-validator"

export class CreateStopDto {
    @IsOptional()
    stop_code: string
    
    @IsOptional()    
    platform_code: string

    @IsOptional()   
    stop_name: string

    @IsOptional()    
    stop_desc: string
    
    @IsLatitude()
    stop_lat: string

    @IsLongitude()
    stop_lon: string
    
    @IsOptional()    
    @IsNumber()
    zone_id: number

    @IsOptional()    
    stop_url: string

    @IsOptional()    
    @IsNumber()
    location_type: number

    @IsOptional()    
    @IsNumber()
    parent_station: number

    @IsOptional()
    stop_timezone: string

    @IsOptional()    
    @IsNumber()
    position: number

    @IsOptional()    
    @IsNumber()
    direction_id: number

    @IsOptional()    
    @IsNumber()
    wheelchair_boarding: number
}
