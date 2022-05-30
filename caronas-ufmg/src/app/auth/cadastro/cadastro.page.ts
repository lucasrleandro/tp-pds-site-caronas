import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from '../usuario.service';

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
    motorista: new FormControl(null, Validators.required),
    passageiro: new FormControl(null, Validators.required),
    senha: new FormControl(null, Validators.required),
    confirmacaoSenha: new FormControl(null, Validators.required),
  });

  constructor(private usuarioService: UsuarioService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  async save() {

    let loading = await this.loadingCtrl.create();
    loading.present();

    try {
      await this.usuarioService.cadastro(this.formCadastro.value).toPromise();

    } finally {
      loading.dismiss();
    }

  }

  formValid() {
    return this.formCadastro.valid;
  }

}
