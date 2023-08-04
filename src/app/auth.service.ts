import { IAccessData } from './models/access-data';
import { HttpClient } from '@angular/common/http';
import { IRegister } from './models/register';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ILogin } from './models/login';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {IUser} from "./models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private jwtHelper:JwtHelperService = new JwtHelperService();

  apiUrl:string = 'http://localhost:3000';
  registerUrl:string = this.apiUrl + '/register';
  loginUrl:string = this.apiUrl + '/login';

  private authSubject: BehaviorSubject<IAccessData | null> = new BehaviorSubject<null | IAccessData>(null);
  user$: Observable<IAccessData | null> = this.authSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user));
  autoLogoutTimer:any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    this.restoreUser()

   }

  login(data:ILogin){
    return this.http.post<IAccessData>(this.loginUrl, data)
    .pipe(tap((data: IAccessData) => {

      this.authSubject.next(data);
      localStorage.setItem('accessData', JSON.stringify(data));


      const expDate: Date = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
      this.autoLogout(expDate);
    }))
  }


  logout(){
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate([''])
  }

  autoLogout(expDate:Date){
    const expMs: number = expDate.getTime() - new Date().getTime();
    this.autoLogoutTimer = setTimeout(() => {
      this.logout()
    }, expMs)
  }

  signUp(data:IRegister){
    return this.http.post<IAccessData>(this.registerUrl, data)
  }


  restoreUser(){
    const userJson:string|null = localStorage.getItem('accessData');
    if(!userJson) return
    const accessData:IAccessData = JSON.parse(userJson);
    if(this.jwtHelper.isTokenExpired(accessData.accessToken)) return
    this.authSubject.next(accessData);
  }





}
