import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-nova-carona',
  templateUrl: './nova-carona.page.html',
  styleUrls: ['./nova-carona.page.scss'],
})
export class NovaCaronaPage implements OnInit {

  formCarona = new FormGroup({
    origem: new FormControl(null, Validators.required),
    destino: new FormControl(null, Validators.required),
    data: new FormControl(null, Validators.required),
    horario: new FormControl(null, Validators.required),
    vagas: new FormControl(null, Validators.required),
    veiculo: new FormControl(null, Validators.required),
    preco: new FormControl(null, Validators.required)
  });

  carona = {
    origem: '',
    destino: '',
    data: '',
    horario: '',
    vagas: 0,
    veiculo: '',
    preco: 0
  }

  constructor() { }

  ngOnInit() {
  }

  save() {

  }

  formValid() {
    return true;
  }

}
