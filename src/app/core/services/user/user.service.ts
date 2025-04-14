import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { constant } from '../../constant/constant';
import { UserLogin, UserRegister } from '../../models/classes/master';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../models/interfaces/master';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  loggedUserDetails:any;

  constructor(){
   const localData = localStorage.getItem(constant.LOCAL_STORAGE_KEYS.LOGGED_USER);
   if(localData){
    this.loggedUserDetails = JSON.parse(localData);
   }
  }


  createUser(userObj:UserRegister){
    return this.http.post(environment.API_URL + constant.API_METHOD_NAME.USER.CREATE_USER,userObj);
  }
  
  userLogin(loginObj:UserLogin): Observable<IApiResponse>{
    return this.http.post<IApiResponse>(environment.API_URL + constant.API_METHOD_NAME.USER.LOGIN,loginObj);
  }
}
