import { Injectable } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController) { }

  public async showAlert(header, msg) {

    let alert = await this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: ['Entendi']
    });

    alert.present();

  }

  public async askQuestion(header, msg, okText?, noText?): Promise<boolean> {
    const that = this;
    return new Promise(function (resolve, reject) {

      let objAlert = {
        header: header,
        message: msg,
        buttons: [
          {
            text: noText ? noText : 'Não',
            handler: () => {
              that.alertCtrl.dismiss();
              resolve(false);
            },
          },
          {
            role: 'destructive',
            cssClass: 'red-danger',
            text: okText ? okText : 'Sim',
            handler: () => {
              that.alertCtrl.dismiss();
              resolve(true);
            },
          },
        ],
      }

      that.alertCtrl
        .create(objAlert)
        .then((e) => e.present());

    });


  }


}
