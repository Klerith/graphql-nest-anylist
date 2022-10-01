import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common'
;
import { ListItem } from './entities/list-item.entity';

import { ListItemService } from './list-item.service';
import { ListItemResolver } from './list-item.resolver';

@Module({
  providers: [ListItemResolver, ListItemService],
  imports: [
    TypeOrmModule.forFeature([ ListItem ])
  ],
  exports: [
    ListItemService, TypeOrmModule
  ]
})
export class ListItemModule {}
