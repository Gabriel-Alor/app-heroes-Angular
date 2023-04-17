import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  public heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute, private heroeService: HeroesService, private router: Router ){}

  ngOnInit(): void {
    
    this.activatedRoute.params
        .pipe(
          switchMap( ({ id }) => {
            return this.heroeService.obtenerHeroePorId( id );
          })
        )
        .subscribe({
          next: ( heroe ) => {
            this.heroe = heroe;
          }
        })
  }
  
  public regresar() {
    // navegar a la ruta de atrás
    this.router.navigate(['/heroes/listado']);
  }

}
