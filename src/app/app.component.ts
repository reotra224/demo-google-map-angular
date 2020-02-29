import {Component, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'demo1-gmap';

  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;

  constructor() {
  }

  ngOnInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(14.7117003, -17.4684255),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);
  }
}
