import { Component, OnInit, HostListener } from '@angular/core';
import { iif, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ESIToken } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: AppService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  @HostListener('window:resize')
  onResize = () => {
    this.service.redraw();
  };

  ngOnInit() {
    this.route.queryParamMap
      .pipe(
        map(val => val.get('code')),
        mergeMap((val: string) =>
          iif(
            () => !!val,
            this.service.getEsiToken(val),
            of(undefined as ESIToken),
          ),
        ),
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

  setMode = () => {
    this.service.mode = !this.service.mode;
  };
}
