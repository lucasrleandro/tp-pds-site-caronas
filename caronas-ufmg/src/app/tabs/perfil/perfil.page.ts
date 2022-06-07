import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService, User } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ToastService } from 'src/app/shared/services/toast-service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  formProfile = new FormGroup({
    nome: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    eMotorista: new FormControl(null, Validators.required),
    ePassageiro: new FormControl(null, Validators.required),
  });

  user: User;

  constructor(private authService: AuthService, private alertService: AlertService, private loadingCtrl: LoadingController, private toastService: ToastService) {
  }

  ngOnInit() {

    this.formProfile.patchValue(this.user);

    this.authService.user.subscribe(u => {
      this.user = { ...u };
      this.formProfile.patchValue(this.user);
    });

  }

  formValid() {
    return this.formProfile.valid && (this.formProfile.get('ePassageiro').value || this.formProfile.get('eMotorista').value)
  }

  async save() {

    let loading = await this.loadingCtrl.create();
    loading.present();

    try {

      await this.authService.updateUser(this.formProfile.value).toPromise();
      this.toastService.makeToast('Alterações salvas!');

    } finally {

      loading.dismiss();
    }

  }

  async logout() {

    const logout = await this.alertService.askQuestion('Atenção', 'Deseja sair da conta?');

    if (logout) this.authService.logout();

  }

}
