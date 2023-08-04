import {Component, OnInit} from '@angular/core';
import {MeteoService} from "../../meteo.service";
import {AuthService} from "../../auth.service";
import {IUser} from "../../models/user";
import {IAccessData} from "../../models/access-data";

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {
  user!: IUser

  constructor(private meteoSvc: MeteoService, private authSvc: AuthService) {
  }

  ngOnInit() {
    // this.meteoSvc.getWheater().subscribe(data => console.log(data))
    this.authSvc.user$.subscribe((data: IAccessData | null): void => {
      this.user = data?.user as IUser

    })
  }
  logOut(){
    this.authSvc.logout()
  }
}
