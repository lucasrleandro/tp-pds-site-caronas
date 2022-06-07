import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  mostrarSenha1 = false;
  mostrarSenha2 = false;
  formCadastro = new FormGroup({
    nome: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    // matricula: new FormControl(null, Validators.required),
    eMotorista: new FormControl(null, Validators.required),
    ePassageiro: new FormControl(null, Validators.required),
    senha: new FormControl(null, Validators.required),
    confirmacaoSenha: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async save() {

    let loading = await this.loadingCtrl.create({ message: 'Cadastrando' });
    loading.present();

    try {

      let objCadastro: any = this.formCadastro.value;
      delete objCadastro.confirmacaoSenha;

      await this.authService.register(objCadastro).toPromise();
      this.formCadastro.reset();

    } finally {
      loading.dismiss();
    }

  }

  formValid() {
    return this.formCadastro.valid;
  }

}
