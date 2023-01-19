import { Route } from 'src/routes/entities/route.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Trip {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ManyToOne((_type) => Route, route => route.trips)
    route: Route

    // ToDo:
    // shape_id
    
    @Column({ nullable: true })
    service_id: string
    
    @Column({ nullable: true })
    trip_short_name: string
    
    @Column({ nullable: true })
    trip_headsign: string

    @Column({ nullable: true })
    direction_id: string

    @Column({ nullable: true })
    block_id: number

    @Column({ nullable: true })
    bikes_allowed: boolean

    @Column({ nullable: true })
    wheelchair_accessible: boolean

    @Column({ nullable: true })
    trip_type: number
   
    @Column({ nullable: true })
    drt_max_travel_time: number
   
    @Column({ nullable: true })
    drt_avg_travel_time: number
    
    @Column({ nullable: true })
    drt_advance_book_min: number
    
    @Column({ nullable: true })
    drt_pickup_message: number
    
    @Column({ nullable: true })
    drt_drop_off_message: number

    @Column({ nullable: true })
    continuous_pickup_message: number

    @Column({ nullable: true })
    continuous_drop_off_message: number
}
