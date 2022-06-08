import { Component, OnInit } from '@angular/core';
import { CaronasService } from '../shared/services/caronas.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  user;
  motoristaPendentes;

  constructor(private caronasService: CaronasService) {

  }

  ngOnInit(): void {

    this.caronasService.solicitacoesMotorista.subscribe(res => {
      if (!res) return;
      this.motoristaPendentes = res.filter(el => el.situacao === '0').length;
    });

  }



}
