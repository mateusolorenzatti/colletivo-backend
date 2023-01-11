import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async getUserById(id: string): Promise<User> {
        let found = new User()
        let notFoundMessage = `User with ID ${id} not found`

        try{
            found = await this.usersRepository.findOne({ where: { id } })
        }catch(QueryFailedError){
            throw new NotFoundException(notFoundMessage)
        } 

        if (!found)
            throw new NotFoundException(notFoundMessage)

        return found
    }

}