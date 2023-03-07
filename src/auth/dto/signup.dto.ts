import {IsNotEmpty, IsNumber, IsString, IsEmail, MinLength} from "class-validator";

export class SignUpDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsEmail({},{message: 'Please enter a valid email'})
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsNumber()
    @IsNotEmpty()
    @MinLength(11)
    readonly accountNumber: number;
} 