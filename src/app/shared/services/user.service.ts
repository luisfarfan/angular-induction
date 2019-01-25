import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserEndpoint } from '../endpoint/user.endpoint';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(UserEndpoint.usersAll);
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get(`${UserEndpoint.usersAll}${id}`);
  }

  editUser(id: number, user: IUser): Observable<IUser> {
    return this.http.put(`${UserEndpoint.usersAll}${id}`, user);
  }

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(UserEndpoint.usersAll, user);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${UserEndpoint.usersAll}${id}`);
  }
}
