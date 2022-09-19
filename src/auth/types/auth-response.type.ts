import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthResponse {

    @Field( () => String )
    token: string;

    @Field( () => User )
    user: User;

}
