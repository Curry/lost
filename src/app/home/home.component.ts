import { Component, OnInit, AfterViewInit, HostListener, AfterContentInit } from '@angular/core';
import { Observable, iif, of, from } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { System } from '../models/system.model';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ESIToken } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  system: Observable<System[]>;
  source: string;

  constructor(
    private service: AppService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}


  @HostListener('window:resize')
  onResize = () => {
    this.service.redraw();
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      map(val => val.get('code')),
      mergeMap((val: string) =>
        iif(
          () => !!val,
          this.service.getEsiToken(val),
          of(undefined as ESIToken),
        ),
      ),
    ).subscribe(() => {
      this.router.navigate(['']);
    });
    this.system = this.service.getSystems(1);
  }

  ngAfterViewInit() {
    this.service.getConnections(1).subscribe();
  }

  setMode = () => {
    this.service.mode = !this.service.mode;
  }
}
