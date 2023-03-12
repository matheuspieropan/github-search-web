import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repositorie } from 'src/app/model/repositorie';

@Injectable({
  providedIn: 'root'
})
export class RepositorieService {

  url: string = 'http://pieropan.up.railway.app/api/search'
  constructor(private http: HttpClient) { }

  getRepositories(userName: string) : Observable<Repositorie>{
    return this.http.get<Repositorie>(`${this.url}/repositorie/${userName}`);
  }
}