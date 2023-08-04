import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {ILogin} from "../../models/login";
import {IUser} from "../../models/user";
import {IAccessData} from "../../models/access-data";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formData:ILogin = {
    email : '',
    password : ''
  }
  user!: IUser
  @ViewChild('alert') alert?:ElementRef
  constructor(
    private authSvc:AuthService,
    private router:Router,
  ){}

  login(){
    this.authSvc.login(this.formData).subscribe(data => {
      this.authSvc.user$.subscribe((data: IAccessData | null): void => {
        this.user = data?.user as IUser


    })
  })}
  close() {
    this.alert?.nativeElement?.remove()
    this.router.navigate([''])
  }

}
