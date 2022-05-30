import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaEstrelasComponent } from './nota-estrelas/nota-estrelas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    NotaEstrelasComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule],
  exports: [
    NotaEstrelasComponent
  ]
})
export class SharedModule { }
