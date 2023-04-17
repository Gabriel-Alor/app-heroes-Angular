import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  public obtenerHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  public obtenerHeroePorId( id: string ): Observable<Heroe> {
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${ id }`);
  }

  public obtenerSugerencias( termino: string ):Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${ termino }&_limit=6`);
  }

  //PETICIÓN POST
  public agregarHeroe( heroe: Heroe ): Observable<Heroe> {
    // el url seguido del objeto a mandar con una coma
    return this.http.post<Heroe>(`${ this.baseUrl }/heroes`, heroe);
  }

  public actualizarHeroe( heroe: Heroe ): Observable<Heroe> {
    // para actualizar se manda el id dentro de la especifica y separado por una coma el objeto que actualizará
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe );
  }

  public eliminarHeroe( id: string ): Observable<any> {
    // para eliminar un registro se debe mandar el id unicamente
    return this.http.delete<any>(`${ this.baseUrl }/heroes/${ id }`);
  }
}
