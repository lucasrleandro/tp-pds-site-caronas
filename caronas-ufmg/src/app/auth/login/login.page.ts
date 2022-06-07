import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  mostrarSenha = false;

  constructor(private platform: Platform, private loadingCtrl: LoadingController, private authService: AuthService, private navCtrl: NavController) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      email: new FormControl(null, Validators.compose([Validators.required])),
      senha: new FormControl(null, Validators.compose([Validators.required]))
    });

    this.authService.logged.subscribe(res => {
      if (res) this.navCtrl.navigateRoot('/tabs/busca');
    });

  }

  async login() {

    if (!this.formLogin.valid) return;

    if ((this.platform.is("mobile") && this.platform.is("hybrid"))) {
      Keyboard.setAccessoryBarVisible({ isVisible: false });
      Keyboard.hide();
    }

    let loading = await this.loadingCtrl.create({
      keyboardClose: true,
      message: "Validando"
    });

    loading.present();

    try {

      await this.authService.login(this.formLogin.get('email').value, this.formLogin.get("senha").value).toPromise();
      this.navCtrl.navigateRoot('/tabs/perfil');
      this.formLogin.reset();

    } finally {
      loading.dismiss();
    }
  }


}
