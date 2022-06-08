import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Carona, CaronasService, SolicitacaoPassageiro } from 'src/app/shared/services/caronas.service';

@Component({
  selector: 'app-passageiro',
  templateUrl: './passageiro.page.html',
  styleUrls: ['./passageiro.page.scss'],
})
export class PassageiroPage implements OnInit {

  solicitacoes: SolicitacaoPassageiro[] = [];

  constructor(private caronasService: CaronasService) { }

  ngOnInit() {

    this.caronasService.solicitacoesPassageiro.subscribe((solicitacoes) => {
      this.solicitacoes = solicitacoes;
    });

  }

  load(event?) {
    this.caronasService.fetchAllSolicitacoesPassageiro().subscribe();
    if (event) event.target.complete();
  }

}
