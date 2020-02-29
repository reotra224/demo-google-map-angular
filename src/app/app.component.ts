import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import MapOptions = google.maps.MapOptions;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'demo1-gmap';
  public searchControl = this.fb.group({
    searchLocation: []
  });
  @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;
  public mapProperties: MapOptions;
  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 14.7117003;
    this.longitude = -17.4684255;

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          console.log('PHONE => ', place.formatted_phone_number);
          console.log('ADDRESS => ', place.adr_address);
          console.log('ADDRESS => ', place.address_components);
          console.log('NAME => ', place.name);
          console.log('GEOMETRY => ', place.geometry.location);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
