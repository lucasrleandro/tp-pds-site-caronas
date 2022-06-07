import { DatePipe } from '@angular/common';
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

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }

  save() {
    console.log(this.formCarona.value);
  }

  formValid() {
    return this.formCarona.valid;
  }

  dateTimeChange(ev) {

    const formatada = this.datePipe.transform(ev.detail.value, 'dd/MM/yyyy HH:mm');
    this.formCarona.get('data').setValue(formatada);

  }

}
