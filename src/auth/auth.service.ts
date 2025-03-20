import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository : UserRepository,
        private jwtService: JwtService
    ) {}    


    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        const { email, password } = authCredentialDto;
        const user = await this.userRepository.findOne( { where: {email} });

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload = { email };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('logIn failed');
        }

    }
}
