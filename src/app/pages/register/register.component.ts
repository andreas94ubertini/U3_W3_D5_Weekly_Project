import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {IRegister} from "../../models/register";
import {AuthService} from "../../auth.service";
import {ILogin} from "../../models/login";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formData:IRegister = {
    nome : '',
    cognome : '',
    email : '',
    password : '',
    favorite: [''],
  }
  formData2:ILogin = {
    email : '',
    password : ''
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
  ){}

  register(){
    this.authSvc.signUp(this.formData)
      .subscribe(res => {
        this.authSvc.login(this.formData2).subscribe(
        )
      })
  }



}
