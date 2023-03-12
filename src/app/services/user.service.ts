import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  url: string = 'https://pieropan.up.railway.app/api/search'
  constructor(private http: HttpClient) { }

  getUserName(userName: string) : Observable<User>{
    return this.http.get<User>(`${this.url}/user/${userName}`);
  }
}