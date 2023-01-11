import { Injectable, UnauthorizedException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { UserLevel } from './enums/user-level.enum';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
        const { username, password, email, firstName, lastName } = authSignUpDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.usersRepository.create({ 
            username, 
            email,
            firstName, 
            lastName,
            password: hashedPassword, 
            level: UserLevel.NORMAL
        })

        try{
            await this.usersRepository.save(user)
        }catch(error){
            if (error.code === '23505') { // Duplicate username
                throw new ConflictException('Username and/or Email already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialsDto

        const user = await this.usersRepository.findOne({ where: { username } })

        if (user && (await bcrypt.compare(password, user.password))) {
            if (user.level === UserLevel.BLOCKED) throw new UnauthorizedException('Please check your credentials')

            const payload: JwtPayload = { username }
            const accessToken: string = await this.jwtService.sign(payload)

            return { accessToken }
        } else {
            throw new UnauthorizedException('Please check your credentials')
        }
    }
}
