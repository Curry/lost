import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { System } from './models/system.model';
import { jsPlumb } from 'jsplumb';

@Injectable({
  providedIn: 'root',
})
export class AppService {

  constructor(private http: HttpClient) {}

  public url = 'http://localhost:3000';

  getSystemInfo = (system: string): Observable<System> =>
    this.http.get<System>(`${this.url}/entity/system/${system}`)
}
