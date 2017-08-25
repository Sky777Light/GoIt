import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgmMap, MapsAPILoader } from '@agm/core';
import { LOCATION_MARKER, ODESSA_POS } from '../../../shared/enums';
import { UserService } from '../user/user.service';
import { IUser } from '../../../models/IUser';
import { IMarker } from '../../../models/IMarker';
import { Marker } from '../../../models/Marker';
import { MapService } from './map.service';

declare var google;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
})

export class MapComponent {
  @ViewChild('locBtn') private locBtn: ElementRef;
  @ViewChild(AgmMap) private mainMap: any;

  private initPos = ODESSA_POS;
  private locationMarker = LOCATION_MARKER;
  private User: IUser;
  private nativeMap;
  private searchedPlaces: any[];


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private mapsAPILoader: MapsAPILoader,
    private mapService: MapService
  ) {
      this.User = this.userService.User;
    }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      this.mainMap._mapsWrapper.getNativeMap().then( (map) => {
        this.nativeMap = map;
        this.nativeMap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(this.locBtn.nativeElement);
      }, (err) => {
        console.log('error', err);
      });
    });
  }

  public findUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.locationMarker.visible = true;
        this.locationMarker.position.lat = position.coords.latitude;
        this.locationMarker.position.lng =  position.coords.longitude;

        this.mainMap._mapsWrapper.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, (err) => {
        console.log(err);
      });
    }
  }

  public getPlaces(types: string): void {
    let service = new google.maps.places.PlacesService(this.nativeMap);
    service.nearbySearch({
      location: this.nativeMap.getCenter(),
      radius: 500,
      type: [types]
    }, (res, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let marker of res) {
          marker.icon = {
            url: marker.icon,
            scaledSize: {
              height: 30,
              width: 30
            }
          };
        }
        this.searchedPlaces = res;
      }
    });
  }

  public createMarker($event: MouseEvent): void {

    let marker: IMarker  = new Marker(
      null,
      this.User._id,
      $event['coords'].lat,
      $event['coords'].lng,
      '',
      true,
      true
    );

    this.User.markers.push( marker );
  }

  private showMarkers(flag: boolean): void {
    this.User.markers.forEach( (marker) => {
      marker.visible = flag;
    });
  }

  private saveMarkers(): void {

    let newMarkers = [];
    this.User.markers.forEach( (marker) => {
        if(!marker._id) {
          newMarkers.push( marker );
        }
    });

    this.mapService.saveMarkers( newMarkers );
  }
}
