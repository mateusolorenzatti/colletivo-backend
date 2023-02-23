import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserLevel } from "../enums/user-level.enum";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    username: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ unique: true })
    email: string
    
    @Column()
    password: string
    
    @Column()
    level: UserLevel
}