import { Stop } from 'src/stops/entities/stop.entity'
import { Trip } from 'src/trips/entities/trip.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class StopTime {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne((_type) => Trip, trip => trip.stop_times, { eager: true })
    trip: Trip
    
    @ManyToOne((_type) => Stop, stop => stop.stop_times, { eager: true })
    stop: Stop

    @Column({ nullable: true })
    arrival_time: string
    
    @Column({ nullable: true })
    departure_time: string
    
    @Column()
    stop_sequence: number
    
    @Column({ nullable: true })
    stop_headsign: string

    @Column({ nullable: true })
    pickup_type: number

    @Column({ nullable: true })
    drop_off_type: number

    @Column({ nullable: true })
    shape_dist_traveled: number

    @Column({ nullable: true })
    timepoint: number

    @Column({ nullable: true })
    start_service_area_id: string  

    @Column({ nullable: true })
    end_service_area_id: string

    @Column({ nullable: true })
    start_service_area_radius: string

    @Column({ nullable: true })
    end_service_area_radius: string

    @Column({ nullable: true })
    continuous_pickup: string

    @Column({ nullable: true })
    continuous_drop_off: string

    @Column({ nullable: true })
    pickup_area_id: string

    @Column({ nullable: true })
    drop_off_area_id: string

    @Column({ nullable: true })
    pickup_service_area_radius: string

    @Column({ nullable: true })
    drop_off_service_area_radius: string
}
