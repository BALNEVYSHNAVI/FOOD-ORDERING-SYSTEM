import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import { CustomHttpService } from '../../services/customhttp.service';
import API_ENDPOINTS from '../../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private loggedInUser:any=null
  private BASE_URL = 'http://localhost:8082/api'; // Base URL
  constructor(private customHttp:CustomHttpService,private router: Router) {}

   /**
   * Login the user by making an API call
   * @param username - User's username
   * @param password - User's password
   * @returns Observable<boolean> - true if login is successful
   */
   async login(email: string, password: string):Promise<boolean> {
    
    try{
      const res:any = await this.customHttp.post(API_ENDPOINTS.LOGIN_API,{email,password})
      console.log(res);
      if(res.data){
        const token = res.data;
        const decodedToken :any = jwtDecode(token)

        if(decodedToken.exp * 1000 < Date.now()){
          throw new Error("Token expired")
        }
        
        const userDetails = {
          username: decodedToken.sub,
          role: decodedToken.role,
          email: decodedToken.email,
          userId: decodedToken.userId,
        }

        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(userDetails))
        localStorage.setItem('role',userDetails.role)

        this.loggedInUserSubject.next(userDetails)
        return true;
      }

      return false;
    }catch(e){
      console.log(e);
      throw e;
    }
  }

  async signUp(payload:any):Promise<boolean> {
    
    try{
      const res:any = await this.customHttp.post(API_ENDPOINTS.SIGNUP_API,payload)
      return res;
    }catch(e){
      console.log(e);
      throw e;
    }
  }

  async getUserDetails(userId:any):Promise<boolean> {
    try{
      const res:any = await this.customHttp.get(API_ENDPOINTS.APP_USER_DETAILS_API(userId))
      return res;
    }catch(e){
      console.log(e);
      throw e;
    }
  }


  get isLoggedIn(): boolean {
    const isLoggedIn = !!localStorage.getItem('user')
    return isLoggedIn;
  }

  get currentUser(): any {
    return JSON.parse(localStorage.getItem('user')!)
  }

  logout(): void {
    this.loggedInUser = null
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('role'); // Remove role
    localStorage.removeItem('user');
  }
}
