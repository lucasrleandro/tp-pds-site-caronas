import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passageiro',
  templateUrl: './passageiro.page.html',
  styleUrls: ['./passageiro.page.scss'],
})
export class PassageiroPage implements OnInit {

  listaCaronas = [{
    _id: 0,
    data: 'hoje',
    rota: 'Centro > UFMG',
    vagas: 2,
    valor: 0,
    motorista: 'Lucas Leandro'
  }];

  constructor() { }

  ngOnInit() {
  }

  


}
