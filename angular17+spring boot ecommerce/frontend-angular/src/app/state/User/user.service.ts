import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { getAllCustomersFailure, getAllCustomersSuccess, getUserProfileFailure, getUserProfileSuccess, logoutSuccess } from './Actions';
import { Store } from '@ngrx/store';
import { BASE_API_URL } from '../../config/api';
import { User } from '../../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = BASE_API_URL+'/api/users/profile';

  constructor(private http: HttpClient, private store:Store) {}

  

  getUserProfile() {
    const headers = new HttpHeaders()
    .set("Authorization",`Bearer ${localStorage.getItem("jwt")}`)
    return this.http.get<User>(this.apiUrl, { headers }).pipe(
      map((data:any)=>{console.log("get user ", data) 
      return getUserProfileSuccess({userProfile:data})}),
      catchError((error: any) => {
        console.error('Error getting user profile', error);
        return of(getUserProfileFailure(error));
      })
    ).subscribe((action)=>{
      console.log("action ",action)
      return this.store.dispatch(action)});
  }

  getAllCustomers() {
    const headers = new HttpHeaders()
    .set("Authorization",`Bearer ${localStorage.getItem("jwt")}`)
    return this.http.get<User>(`${BASE_API_URL}/api/admin/users`, { headers }).pipe(
      map((data:any)=>{
        console.log("get user ", data) 
      return getAllCustomersSuccess({payload:data})}),
      catchError((error: any) => {
        console.error('Error getting user profile', error);
        return of(getAllCustomersFailure(error));
      })
    ).subscribe((action)=>{
      console.log("action ",action)
      return this.store.dispatch(action)});
  }



  logout(){
    localStorage.removeItem('jwt');
    this.store.dispatch(logoutSuccess())
  }
}
