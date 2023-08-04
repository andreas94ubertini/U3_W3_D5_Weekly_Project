import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscription} from "rxjs";
import {ApiResp} from "./models/api-resp";

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  apiKey:string = "f9b2d2a6d2d0aa17e7e2b1f366bbefe6"
  risposta!: Observable<ApiResp>

  constructor(private http:HttpClient) { }
  getWheater(lat:number, lon:number):Observable<ApiResp>{
    return this.risposta = this.http.get<ApiResp>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=it`)
  }
  getLocalWheater(query:string):Observable<any>{
    return this.risposta = this.http.get<any>(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`)
  }
}
