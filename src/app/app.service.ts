import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { System } from './models/system.model';
import { jsPlumb } from 'jsplumb';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  jsPlumbInstance = jsPlumb.getInstance();

  constructor(private http: HttpClient,
    ) {
  }

  public url: string = "http://localhost:3000"

  getSystemInfo = (system: string): Observable<System> => this.http.get<System>(`${this.url}/system/${system}`);
}
