import { Agency } from 'src/agency/entities/agency.entity'
import { Trip } from 'src/trips/entities/trip.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class Route {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ManyToOne((_type) => Agency, agency => agency.routes)
    agency: Agency
    
    @Column({ nullable: true })
    short_name: string
    
    @Column({ nullable: true })
    long_name: string
    
    @Column({ nullable: true })
    desc: string

    @Column({ nullable: true })
    type: string

    @Column({ nullable: true })
    url: string
    
    @Column({ nullable: true })
    color: string
    
    @Column({ nullable: true })
    text_color: string

    @Column({ nullable: true })
    sort_order: number
    
    @Column({ nullable: true })
    min_headway_minutes: number
    
    @Column({ nullable: true })
    eligibility_restricted: number

    @OneToMany((_type) => Trip, trip => trip.route)
    trips: Trip[]
}
