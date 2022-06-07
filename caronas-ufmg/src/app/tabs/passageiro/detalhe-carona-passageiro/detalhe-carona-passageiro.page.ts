import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Carona, CaronasService, SolicitacaoPassageiro } from 'src/app/shared/services/caronas.service';
import { ToastService } from 'src/app/shared/services/toast-service';

@Component({
  selector: 'app-detalhe-carona-passageiro',
  templateUrl: './detalhe-carona-passageiro.page.html',
  styleUrls: ['./detalhe-carona-passageiro.page.scss'],
})
export class DetalheCaronaPassageiroPage implements OnInit {

  solicitado = false;
  carona: Carona;
  userId: string;

  constructor(private alertCtrl: AlertController, private authService: AuthService, private route: ActivatedRoute, private loadingCtrl: LoadingController, private toastService: ToastService, private caronasService: CaronasService) { }

  ngOnInit() {

    const caronaId = this.route.snapshot.paramMap.get('id');
    this.carona = this.caronasService.getCaronaLocalById(caronaId);

    this.caronasService.solicitacoesPassageiro.subscribe(solicitacoes => {

      if (!solicitacoes) return;
      this.solicitado = !!solicitacoes.find(solicitacao => solicitacao.idPassageiro === this.authService.getUserValue()._id && solicitacao.idCarona === caronaId);

    })

  }

  async solicitar() {
    // let alert = await this.alertCtrl.create({ header: 'Carona solicitada!', message: 'Agora é só aguardar a resposta de Lucas.', buttons: ['Entendi'] });
    // alert.present();
    // this.solicitado = true;
    let loading = await this.loadingCtrl.create({ message: 'Enviando solicitação' });;

    try {

      await this.caronasService.solicitarCarona(this.carona).toPromise();
      this.solicitado = true;
      this.toastService.makeToast('Carona solicitada!');

    } catch {
      loading.dismiss();
    }

  }

  async cancelar() {

    let alert = await this.alertCtrl.create({
      header: 'Cancelar carona?', message: 'Quer mesmo cancelar a carona?', buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.solicitado = false;
          }
        },
        {
          text: 'Não',
          handler: () => {
            //
          }
        }
      ]
    });

    alert.present();
  }

}
