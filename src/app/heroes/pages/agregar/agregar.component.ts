import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;  
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]

  public heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private heroeService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog  ){}

  ngOnInit(): void {

    // para saber si en el url viene la palabra editar entocnes significa que vamos actualizar
    if( !   this.router.url.includes('editar') ){
      return;
    }

    this.activatedRoute.params
        .pipe(
          switchMap( ({ id }) => {
            // retornar el nuevo observable
            return this.heroeService.obtenerHeroePorId(id)
          })
        )
        .subscribe({
          next: (heroe) => {
            console.log(heroe);
            this.heroe = heroe;
          },
          error: (err) => {
            console.log(err);
          }
        })
  }

  public guardarDatos() {
    if( this.heroe.superhero.trim().length === 0 ){
      return;
    }

    // bandera para saber si se esta actualizando o agregando un nuevo registro
    if( this.heroe.id ){
      //ACTUALIZAR DATOS
      this.heroeService.actualizarHeroe( this.heroe )
          .subscribe({
            next: (heroe) => {
              this.mostrarSnackBar('El rgistro se actualizo con éxito!!');
            },
            error: (err) => {
              console.log(err);
            }
          })
    }else{
      //GUARDAR NUEVO HEROE
      this.heroeService.agregarHeroe( this.heroe )
      .subscribe({
        next: (heroe) => {
          this.mostrarSnackBar('El rgistro se creó con éxito!!');
          this.router.navigate(['/heroes/editar', heroe.id])
        },
        error: (err) => {
          console.log( err );
        }
      })
    }
  
  }

  public borrarHeroe() {


    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '270px',
      data: {...this.heroe}
    })

    dialog.afterClosed().subscribe({
      next: (result) => {
        if( result === true ){
          this.heroeService.eliminarHeroe( this.heroe.id! )
          .subscribe({
            next: (resp) => {
              this.router.navigate(['/heroes']);
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      }
    })
  }

  public mostrarSnackBar( mensaje: string ) {
    this.snackBar.open( mensaje, 'ok!', {
      // duración en segundo que quieres que se muestre el snackBar
      duration: 2000
    });
  }
}
