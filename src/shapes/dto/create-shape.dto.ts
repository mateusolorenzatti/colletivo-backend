import { IsNumber, IsOptional } from "class-validator"

export class CreateShapeDto {
    @IsNumber()
    shape_id: number
    
    @IsNumber()
    pt_sequence: number

    @IsNumber()
    pt_lat: string

    @IsNumber()
    pt_lon: string

    @IsOptional()    
    @IsNumber()
    dist_traveled: number
}
