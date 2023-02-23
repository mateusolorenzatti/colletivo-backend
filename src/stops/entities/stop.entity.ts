import { StopTime } from 'src/stop-times/entities/stop-time.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class Stop {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToMany((_type) => StopTime, stop_time => stop_time.stop)
    stop_times: StopTime[]

    @Column({ nullable: true })
    stop_code: string

    @Column({ nullable: true })
    platform_code: string
    
    @Column({ nullable: true }) 
    stop_name: string
    
    @Column({ nullable: true })
    stop_desc: string
    
    @Column()
    stop_lat: string
    
    @Column()
    stop_lon: string
    
    @Column({ nullable: true })
    zone_id: number
    
    @Column({ nullable: true })
    stop_url: string
    
    @Column({ nullable: true })
    location_type: number
    
    @Column({ nullable: true })
    parent_station: number
    
    @Column({ nullable: true })
    stop_timezone: string
    
    @Column({ nullable: true })
    position: number
    
    @Column({ nullable: true })
    direction_id : number
    
    @Column({ nullable: true })
    wheelchair_boarding: number
}
