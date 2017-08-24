import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AgmMap, MapsAPILoader} from '@agm/core';
import { ODESSA_POS } from '../../../shared/enums';
import {UserService} from "../user/user.service";
import {IUser} from "../../../models/IUser";
import {IMarker} from "../../../models/IMarker";
import {Marker} from "../../../models/Marker";

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
})

export class MapComponent {
  @ViewChild(AgmMap) mainMap: any;

  private initPos = ODESSA_POS;
  private User: IUser;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private mapsAPILoader: MapsAPILoader
  ) {
      this.User = this.userService.User;
    }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      this.findUserLocation();
    });
  }

  public findUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.mainMap._mapsWrapper.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, err => {
        console.log(err);
      });
    }
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

    this.User.markers.push(marker);
  }

  private showMarkers(flag: boolean): void {
    this.User.markers.forEach( marker =>{
      marker.visible = flag;
    })
  }

  private saveMarkers(): void {
    console.log(this.User.markers);
  }
}
