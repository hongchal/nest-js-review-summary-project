import { User } from "./user.entity";
import { DataSource, Repository } from "typeorm";
import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserRepository extends Repository<User> {
    constructor(datasource: DataSource) {
        super(User, datasource.createEntityManager());
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { email, password } = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ email, password: hashedPassword });

        try{
            await this.save(user);
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Username already exists');
            } else {
            throw new InternalServerErrorException()
            }
        }
    }   
}