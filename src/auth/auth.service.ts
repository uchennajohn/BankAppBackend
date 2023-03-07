import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { strict } from 'assert';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ){}


    async signUp(signUpDto: SignUpDto): Promise<{token: string, message: string}>{
        const {name, email, password, accountNumber} = signUpDto;

        //check if email already exists
        const userWithEmail = await this.userModel.findOne({ email });
        if (userWithEmail) {
          throw new UnauthorizedException('Email already exists');
        }
         //check if account number already exists
        const userWithAccountNumber = await this.userModel.findOne({ accountNumber });
        if (userWithAccountNumber) {
          throw new UnauthorizedException('Account number already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            accountNumber
        })

        const token = this.jwtService.sign({id: user._id});
        const message = 'Account Created, Login to continue';
        
        return {token, message};
    }


    async login(loginDto: LoginDto):Promise<{token: string, userId: string, message: string}> {
        const {email, accountNumber, password} = loginDto;
    
        const user = await this.userModel.findOne({email});
        const isAccountNumberValid = await this.userModel.findOne({accountNumber});
        const isPasswordValid = user && (await bcrypt.compare(password, user.password));
    
        if (!user || !isAccountNumberValid || !isPasswordValid) {
            throw new UnauthorizedException('Invalid email, password, or account number');
        }
    
        const token = this.jwtService.sign({id: user._id});
        const userId = user._id.toString();
        const message = 'Login successful';
    
        return {token, userId, message};
    }
    
    
}    




