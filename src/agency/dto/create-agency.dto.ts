import { IsMobilePhone, IsOptional } from "class-validator"

export class CreateAgencyDto {
    name: string
    phone: string
    
    @IsOptional()
    lang?: string

    @IsOptional()
    timezone?: string

    @IsOptional()
    url?: string

    @IsOptional()
    fare_url?: string
}
