import { IsString, MaxLength, MinLength, Matches } from "class-validator";

export class AuthCredentialDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, 
        {message: 'Password only accepts english and numbers'}
    )
    password: string;
}