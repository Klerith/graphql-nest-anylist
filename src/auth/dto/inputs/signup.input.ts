import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class SignupInput {

    @Field( () => String )
    @IsEmail()
    email: string;

    @Field( () => String )
    @IsNotEmpty()
    fullName: string;

    @Field( () => String )
    @MinLength(6)
    password: string;

}