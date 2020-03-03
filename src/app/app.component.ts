import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './app.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import Two from 'two.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'lost';
  @ViewChild('myCanvas') canvasRef: ElementRef;

  @ViewChild('buttonOne') buttonOne: ElementRef;

  @ViewChild('buttonTwo') buttonTwo: ElementRef;

  ngAfterViewInit(): void {
      var two = new Two().appendTo(this.buttonOne.nativeElement);
      console.log(two);


      // two has convenience methods to create shapes.
      var circle = two.makeCircle(72, 100, 50);
      var rect = two.makeRectangle(213, 100, 100, 100);

      // The object returned has many stylable properties:
      circle.fill = '#FF8000';
      circle.stroke = 'orangered'; // Accepts all valid css color
      circle.linewidth = 5;

      rect.fill = 'rgb(0, 200, 255)';
      rect.opacity = 0.75;
      rect.noStroke();

      // Don't forget to tell two to render everything
      // to the screen
      two.update();

    // // Draw the clip path that will mask everything else
    // // that we'll draw later.
    // ctx.beginPath();
    // ctx.moveTo(250, 60);
    // ctx.lineTo(63.8, 126.4);
    // ctx.lineTo(92.2, 372.6);
    // ctx.lineTo(250, 460);
    // ctx.lineTo(407.8, 372.6);
    // ctx.lineTo(436.2, 126.4);
    // ctx.moveTo(250, 104.2);
    // ctx.lineTo(133.6, 365.2);
    // ctx.lineTo(177, 365.2);
    // ctx.lineTo(200.4, 306.8);
    // ctx.lineTo(299.2, 306.8);
    // ctx.lineTo(325.2, 365.2);
    // ctx.lineTo(362.6, 365.2);
    // ctx.lineTo(250, 104.2);
    // ctx.moveTo(304, 270.8);
    // ctx.lineTo(216, 270.8);
    // ctx.lineTo(250, 189);
    // ctx.lineTo(284, 270.8);
    // ctx.clip('evenodd');

    // // Draw 50,000 circles at random points
    // ctx.beginPath();
    // ctx.fillStyle = '#DD0031';
    // for (let i = 0; i < 50000; i++) {
    //   let x = Math.random() * 500;
    //   let y = Math.random() * 500;
    //   ctx.moveTo(x, y);
    //   ctx.arc(x, y, 1, 0, Math.PI * 2);
    // }
    // ctx.fill();
  }

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
