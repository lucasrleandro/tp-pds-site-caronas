import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalhe-carona-passageiro',
  templateUrl: './detalhe-carona-passageiro.page.html',
  styleUrls: ['./detalhe-carona-passageiro.page.scss'],
})
export class DetalheCaronaPassageiroPage implements OnInit {

  solicitado = false;

  

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async solicitar() {
    let alert = await this.alertCtrl.create({ header: 'Carona solicitada!', message: 'Agora é só aguardar a resposta de Lucas.', buttons: ['Entendi'] });
    alert.present();
    this.solicitado = true;
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
