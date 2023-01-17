import { IsNumber, IsOptional, IsUUID, Matches } from "class-validator"

export class CreateRouteDto {
    @IsUUID('all', { each: true })
    agency: string

    short_name?: string
    long_name?: string
    desc?: string
    type?: string
    url?: string

    @IsOptional()
    @Matches(
        /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        {
            each: true,
            message: 'color must be a hex color value (without #)'
        }
    )
    color?: string

    @IsOptional()
    @Matches(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        {
            each: true,
            message: 'text_color must be a hex color value (without #)'
        }
    )
    text_color?: string

    @IsOptional()
    @IsNumber()
    sort_order?: number

    @IsOptional()
    @IsNumber()
    min_headway_minutes?: number

    @IsOptional()
    @IsNumber()
    eligibility_restricted?: number
}
