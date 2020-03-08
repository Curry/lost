import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { System } from './data/system.db';
import { SystemModel } from './models/system';
import { Corporation } from './data/corporation.db';
import { Station } from './data/station.db';

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepo: Repository<System>,
    @InjectRepository(Corporation)
    private readonly corpRepo: Repository<Corporation>,
    @InjectRepository(Station)
    private readonly test: Repository<Station>,
  ) {}

  findSystemByName = (name: string): Observable<SystemModel> =>
    from(this.systemRepo.findOne({ systemName: name })).pipe(
      map(val => new SystemModel(val))
    )

  findCorpById = (id: number) =>
    from(this.corpRepo.findOne(id))

  findTest = () => from(this.test.findOne(60000004));
}
