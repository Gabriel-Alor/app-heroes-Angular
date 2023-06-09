import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  public get auth(): Auth {
    return {...this._auth!};
  }

  constructor( private http: HttpClient ) { }

  public verificaAutenticacion():Observable<boolean> {
    if( !localStorage.getItem('token') ){
       return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
               .pipe(
                map( (auth) => {
                  this._auth = auth;
                  return true;
                })
               )
  }

  public login():Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
               .pipe(
                  tap( (resp) => {
                    console.log(resp);
                    this._auth = resp;
                  }),
                  tap( auth => {
                    localStorage.setItem('token', auth.id );
                  })
               )
  }

  public logout() {
    this._auth = undefined;
  }


}
