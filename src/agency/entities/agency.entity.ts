import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Agency {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    name: string
    
    @Column()
    phone: string
    
    @Column()
    lang: string
    
    @Column({ nullable: true })
    timezone: string

    @Column({ nullable: true })
    url: string

    @Column({ nullable: true })
    fare_url: string
}
