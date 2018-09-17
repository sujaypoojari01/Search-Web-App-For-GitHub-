import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getUser(name: string): Observable<User> {
    const url = `https://api.github.com/users/${name}`;
    return this.http.get<User>(url);
  }
}
