import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`
  `]
})
export class ListadoComponent implements OnInit {

  public heroes: Heroe[] = [];

  constructor( private heroesService: HeroesService ) {}

  ngOnInit(): void {
   this.heroesService.obtenerHeroes()
       .subscribe({
        next: (resp) => {
          this.heroes = resp;
        },
        error: (err) => {
          console.log(err);
        }
       })
  }


}
