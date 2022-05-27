import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.page.html',
  styleUrls: ['./motorista.page.scss'],
})
export class MotoristaPage implements OnInit {

  listaCaronas = [{
    _id: 0,
    data: '',
    rota: '',
    passageiros: 0
  }];

  constructor() { }

  ngOnInit() {
  }

}
