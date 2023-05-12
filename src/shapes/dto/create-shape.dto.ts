import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"

export class CreateShapeDto {
    @IsString()
    shape_id: string

    @IsUUID('all', { each: true })
    trip: string
    
    @IsNumber()
    pt_sequence: number

    @IsLatitude()
    pt_lat: string

    @IsLongitude()
    pt_lon: string

    @IsOptional()    
    @IsNumber()
    dist_traveled: number
}
