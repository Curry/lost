import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  getSystems = (): Observable<number[]> =>
    this.http.get<number[]>('https://esi.evetech.net/latest/universe/systems/?datasource=tranquility')

  getSystemInfo = (system: number) => this.http.get(`https://esi.evetech.net/latest/universe/systems/${system}/?datasource=tranquility`);

  getAllSystems = () => {
    this.getSystems().pipe(
      mergeMap(val => forkJoin(val.slice(1, 10).map(this.getSystemInfo)))
    ).subscribe((res) => {
      console.log(res);
    });
  }
}
