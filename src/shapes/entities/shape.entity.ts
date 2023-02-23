import { Trip } from 'src/trips/entities/trip.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Index, ManyToOne } from 'typeorm'

@Entity()
@Index(["id", "shape_id", "pt_sequence"], { unique: true })
export class Shape {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne((_type) => Trip, trip => trip.shape, { eager: false })
    trip: Trip

    @Column()
    shape_id: number
    
    @Column()
    pt_sequence: number

    @Column()
    pt_lat: string

    @Column()
    pt_lon: string
    
    @Column({ nullable: true })
    dist_traveled: number
}
