import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/authguard-test')
    @UseGuards(AuthGuard()) 
    test(@GetUser('user') user: User) {
        return user;
    }
}   
