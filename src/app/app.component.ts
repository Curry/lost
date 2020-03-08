import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lost';
  @ViewChild('myCanvas') canvasRef: ElementRef;

  @ViewChild('buttonOne') buttonOne: ElementRef;

  @ViewChild('buttonTwo') buttonTwo: ElementRef;

  constructor(private service: AppService) {
  }

  test = () => {
    this.service.getSystemInfo('J114154').subscribe(val => {

      // console.log(this.buttonTwo.nativeElement);
    });
  }

  dragEnd(event: CdkDragEnd) {
    const transform = this.buttonOne.nativeElement.style.transform;
    console.log(transform);
  }
}
