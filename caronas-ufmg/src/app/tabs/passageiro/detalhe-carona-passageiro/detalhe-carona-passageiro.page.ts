import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Carona, CaronasService, SolicitacaoPassageiro } from 'src/app/shared/services/caronas.service';
import { ToastService } from 'src/app/shared/services/toast-service';

@Component({
  selector: 'app-detalhe-carona-passageiro',
  templateUrl: './detalhe-carona-passageiro.page.html',
  styleUrls: ['./detalhe-carona-passageiro.page.scss'],
})
export class DetalheCaronaPassageiroPage implements OnInit {

  carona: Carona;
  userId: string;

  solicitacao: SolicitacaoPassageiro;

  userIsDriver = false;

  constructor(private alertCtrl: AlertController, private authService: AuthService, private alertService: AlertService, private route: ActivatedRoute, private loadingCtrl: LoadingController, private toastService: ToastService, private caronasService: CaronasService) { }

  ngOnInit() {

    const caronaId = this.route.snapshot.paramMap.get('id');
    this.carona = this.caronasService.getCaronaLocalById(caronaId);

    this.userId = this.authService.getUserValue()._id;

    this.caronasService.solicitacoesPassageiro.subscribe(solicitacoes => {

      this.userIsDriver = (this.carona.motorista._id === this.userId);

      if (!solicitacoes) return;
      this.solicitacao = solicitacoes.find(solicitacao => solicitacao.passageiro._id === this.userId && solicitacao.carona._id === caronaId);

    })

  }

  async solicitar() {
    // let alert = await this.alertCtrl.create({ header: 'Carona solicitada!', message: 'Agora é só aguardar a resposta de Lucas.', buttons: ['Entendi'] });
    // alert.present();
    // this.solicitado = true;
    let loading = await this.loadingCtrl.create({ message: 'Enviando solicitação' });;

    try {

      await this.caronasService.solicitarCarona(this.carona).toPromise();
      this.toastService.makeToast('Carona solicitada!');

    } catch {
      loading.dismiss();
    }

  }

  async cancelar() {

    const res = await this.alertService.askQuestion('Cancelar solicitação', 'Quer mesmo cancelar essa solicitação?')

    if (!res) return;

    await this.caronasService.cancelarSolicitacao(this.solicitacao._id).toPromise();
    this.toastService.makeToast('Solicitação cancelada');

  }

}
