import { IsLatitude, IsLongitude, IsNumber, IsOptional } from "class-validator"

export class CreateShapeDto {
    @IsNumber()
    shape_id: number
    
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
