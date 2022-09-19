
import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {
    admin     = 'admin', 
    user      = 'user',  
    superUser = 'superUser'
}

registerEnumType( ValidRoles, { name: 'ValidRoles', description: 'Ullamco labore ut ut adipisicing commodo sit elit ullamco eiusmod ut mollit sint.' } )


