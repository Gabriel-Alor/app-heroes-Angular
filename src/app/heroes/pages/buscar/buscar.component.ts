import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent {
  public termino: string = '';
  public heroes: Heroe[] = [];

  public heroeSeleccionado: Heroe | undefined;

  constructor( private heroesService: HeroesService ) {}

  public buscando() {
    this.heroesService.obtenerSugerencias( this.termino.trim() )
        .subscribe({
          next: ( resp ) => {
            this.heroes = resp;
          },
          error: (err) => {
            console.log(err);
          }
        })
  }

  public opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {
    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value
    this.termino = heroe.superhero;

    this.heroesService.obtenerHeroePorId( heroe.id! )
        .subscribe({
          next: (heroe) => {
            this.heroeSeleccionado = heroe;
          },
          error: (err) => {
            console.log(err);
          }
        })
  }
}
