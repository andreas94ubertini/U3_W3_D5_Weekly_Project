import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MeteoService} from "../../meteo.service";
import {AuthService} from "../../auth.service";
import {IUser} from "../../models/user";
import {IAccessData} from "../../models/access-data";
import {query} from "@angular/animations";
import {ApiResp} from "../../models/api-resp";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user!: IUser
  query!: string
  city!:string
  lat!: number
  lon!: number
  data!: ApiResp
  fav!: string
  src!:string


  constructor(private meteoSvc: MeteoService, private authSvc: AuthService) {

  }


  ngOnInit() {
    this.authSvc.user$.subscribe((data: IAccessData | null): void => {
      this.user = data?.user as IUser

    })
  }

  getForecast() {
    console.log(this.query)
    this.city = this.query
    this.meteoSvc.getLocalWheater(this.query).subscribe(data => {
      this.lon = data[0].lon
      this.lat = data[0].lat
      this.meteoSvc.getWheater(this.lat, this.lon).subscribe(
        data => {
          console.log(data.weather[0].icon)
          this.data = data
          this.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        }
      )
    })
  }

  addFav() {
    if (this.fav === 'fav') {
      this.fav = ''
    } else {
      this.fav = 'fav'
    }
  }

}
