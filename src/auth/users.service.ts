import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async getUserById(id: string): Promise<User> {
        let found = new User()
        let notFoundMessage = `User with ID ${id} not found`

        try{
            found = await this.userRepository.findOne({ where: { id } })
        }catch(QueryFailedError){
            throw new NotFoundException(notFoundMessage)
        } 

        if (!found)
            throw new NotFoundException(notFoundMessage)

        return found
    }

}