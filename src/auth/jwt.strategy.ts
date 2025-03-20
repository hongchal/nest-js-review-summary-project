import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){    
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository  
    ){
        super({
            secretOrKey: 'Secret1234',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }

    async validate(payload){
        const { email } = payload;
        const user = await this.userRepository.findOne({ where: { email } });

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}