import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Carona, CaronasService, SolicitacaoMotorista, SolicitacaoPassageiro } from 'src/app/shared/services/caronas.service';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.page.html',
  styleUrls: ['./motorista.page.scss'],
})
export class MotoristaPage implements OnInit {

  caronas: Carona[];
  solicitacoes: SolicitacaoMotorista[];

  constructor(private caronasService: CaronasService, private authService: AuthService) { }


  ngOnInit() {

    this.caronasService.caronasMotorista.subscribe(res => {
      this.caronas = res;
      this.mount();
    });

    this.caronasService.solicitacoesMotorista.subscribe(res => {
      this.solicitacoes = res;
      this.mount();
    });

  }

  mount() {

    if (!this.caronas || !this.solicitacoes) return;

    for (let carona of this.caronas)
      carona.solicitacoesPendentes = this.solicitacoes.filter(sol => sol.carona._id === carona._id && (sol.situacao === '0' || sol.situacao === 'PENDENTE')).length;

  }

  load(ev?) {
    this.caronasService.fetchAllCaronasMotorista().subscribe();
    this.caronasService.fetchAllSolicitacoesMotorista().subscribe();
    if (ev) ev.target.complete();
  }

}
