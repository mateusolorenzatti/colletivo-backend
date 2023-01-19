import { Route } from 'src/routes/entities/route.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Agency {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    name: string
    
    @Column({ nullable: true })
    phone: string
    
    @Column({ nullable: true })
    lang: string
    
    @Column({ nullable: true })
    timezone: string

    @Column({ nullable: true })
    url: string

    @Column({ nullable: true })
    fare_url: string

    @OneToMany((_type) => Route, route => route.agency)
    routes: Route[]
}
