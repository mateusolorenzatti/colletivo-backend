import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsUUID } from "class-validator"

export class CreateShapeDto {
    @IsNumber()
    shape_id: number

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
