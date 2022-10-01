import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ListItem } from './../../list-item/entities/list-item.entity';
import { User } from './../../users/entities/user.entity';

@Entity({ name: 'lists' })
@ObjectType()
export class List {
  
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column()
  @Field( () => String )
  name: string;

  // Relación, index('userId-list-index')
  @ManyToOne( () => User, (user) => user.lists, { nullable: false, lazy: true  })
  @Index('userId-list-index')
  @Field( () => User )
  user: User;

  @OneToMany( () => ListItem, (listItem) => listItem.list, { lazy: true })
  // @Field( () => [ListItem] )
  listItem: ListItem[];
  
}
