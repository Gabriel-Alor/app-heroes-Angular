import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ConfirmarComponent>, @Inject(MAT_DIALOG_DATA) public data: Heroe ){}

  ngOnInit(): void {
    console.log(this.data);
  }


  public borrar() {
    this.dialogRef.close(true);
  }

  public cancelar() {
    this.dialogRef.close(false);
  }
}
