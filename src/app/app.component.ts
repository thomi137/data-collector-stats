import { Component, VERSION, OnInit } from '@angular/core';
import {Trial, DataPoint} from './trial';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  validated = false

  trial: Trial = new Trial();

  submitted = false;

  model: DataPoint;

  ngOnInit(){
    this.model = {data: 0, lat: 0, long: 0};
  }

  onSubmit() {
    this.validated = false;
    this.trial.dataPoints.push(this.model);
    this.model = {data: 0, lat: 0, long: 0};
  }

}
