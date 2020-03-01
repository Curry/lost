import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lost';

  constructor(private service: AppService) {}

  test = () => {
    this.service.getAllSystems()
    //   .subscribe(res => {
    //   console.log(res);
    // });
  }
}
