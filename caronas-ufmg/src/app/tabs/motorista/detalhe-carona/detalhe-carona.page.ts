import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Carona, CaronasService, SolicitacaoPassageiro } from 'src/app/shared/services/caronas.service';
import { ToastService } from 'src/app/shared/services/toast-service';

@Component({
  selector: 'app-detalhe-carona',
  templateUrl: './detalhe-carona.page.html',
  styleUrls: ['./detalhe-carona.page.scss'],
})
export class DetalheCaronaPage implements OnInit, OnDestroy {

  carona: Carona;
  userId: string;

  solicitacoes: SolicitacaoPassageiro[];
  solicitacoesSub: Subscription;

  constructor(private alertCtrl: AlertController, private authService: AuthService, private alertService: AlertService, private route: ActivatedRoute, private loadingCtrl: LoadingController, private toastService: ToastService, private caronasService: CaronasService) { }

  ngOnInit() {

    const caronaId = this.route.snapshot.paramMap.get('id');

    this.carona = this.caronasService.getCaronaMotoristaById(caronaId);
    this.caronasService.fetchAllSolicitacoesMotorista().subscribe();

    this.solicitacoesSub = this.caronasService.solicitacoesMotorista.subscribe(res => {
      if (!res) return;
      this.solicitacoes = res.filter(sol => sol.carona._id === caronaId);
    });

  }

  ngOnDestroy(): void {
    if (this.solicitacoesSub)
      this.solicitacoesSub.unsubscribe();
  }

  async abrirMsg() {
    this.toastService.makeToast('Em desenvolvimento');
  }

  async accept(solicitacao: SolicitacaoPassageiro) {
    await this.caronasService.aceitarSolicitacao(solicitacao._id).toPromise();
    this.toastService.makeToast('Solicitação aceita!');
  }

  async dennie(solicitacao) {
    await this.caronasService.aceitarSolicitacao(solicitacao._id).toPromise();
    this.toastService.makeToast('Solicitação recusada!');
  }

}
