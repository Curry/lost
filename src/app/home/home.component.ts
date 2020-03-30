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
export class HomeComponent {
  constructor(private service: AppService) {}

  @HostListener('window:resize')
  onResize = () => {
    this.service.redraw();
  };

  setMode = () => {
    this.service.mode = !this.service.mode;
  };
}
