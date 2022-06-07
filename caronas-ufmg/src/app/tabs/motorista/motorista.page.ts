import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Carona, CaronasService, SolicitacaoPassageiro } from 'src/app/shared/services/caronas.service';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.page.html',
  styleUrls: ['./motorista.page.scss'],
})
export class MotoristaPage implements OnInit {

  solicitacoes: SolicitacaoPassageiro[] = [];

  constructor(private caronasService: CaronasService) { }

  ngOnInit() {

    this.caronasService.solicitacoesMotorista.subscribe((solicitacoes) => {
      if (solicitacoes) this.solicitacoes = [...solicitacoes];
    });

    this.load();

  }

  load(event?) {
    this.caronasService.fetchAllSolicitacoesMotorista().subscribe();
    if (event) event.target.complete();
  }


}
