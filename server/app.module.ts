import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityModule } from './entity/entity.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/lost/browser')
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'eve_data',
      autoLoadEntities: true,
    }),
    EntityModule,
  ]
})
export class AppModule {}
