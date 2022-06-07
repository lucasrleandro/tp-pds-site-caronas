import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { CaronasService } from 'src/app/shared/services/caronas.service';
import { ToastService } from 'src/app/shared/services/toast-service';

@Component({
  selector: 'app-nova-carona',
  templateUrl: './nova-carona.page.html',
  styleUrls: ['./nova-carona.page.scss'],
})
export class NovaCaronaPage implements OnInit {

  formCarona = new FormGroup({
    enderecoSaida: new FormControl(null, Validators.required),
    enderecoDestino: new FormControl(null, Validators.required),
    dataHorarioSaida: new FormControl(null, Validators.required),
    dataFormatada: new FormControl(null, Validators.required),
    vagasOfertadas: new FormControl(null, Validators.required),
    veiculo: new FormControl(null, Validators.required),
    valor: new FormControl(null, Validators.required)
  });


  constructor(private datePipe: DatePipe, private caronaService: CaronasService, private authService: AuthService, private navCtrl: NavController, private loadingCtrl: LoadingController, private toastService: ToastService) { }

  ngOnInit() {
  }

  async save() {

    if (!this.formCarona.valid) return;

    const loading = await this.loadingCtrl.create({ message: 'Publicando carona...' });
    loading.present();

    try {

      let objForm = { ...this.formCarona.value };
      delete objForm.dataFormatada;

      objForm.ativa = true;
      objForm.motorista = this.authService.getUserValue()._id;

      objForm.vagasDisponiveis = objForm.vagasOfertadas;

      await this.caronaService.criarCarona(objForm).toPromise();
      this.toastService.makeToast('Carona publicada!');

      this.navCtrl.navigateBack('/tabs/motorista');

    } finally {
      loading.dismiss();
    }

  }

  formValid() {
    return this.formCarona.valid;
  }

  dateTimeChange(ev) {

    const formatada = this.datePipe.transform(ev.detail.value, 'dd/MM/yyyy HH:mm');
    this.formCarona.get('dataFormatada').setValue(formatada);

  }

}
