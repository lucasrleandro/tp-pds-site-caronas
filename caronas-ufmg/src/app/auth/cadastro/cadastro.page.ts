import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    matricula: new FormControl(null, Validators.required),
    motorista: new FormControl(null, Validators.required),
    passageiro: new FormControl(null, Validators.required),
    senha: new FormControl(null, Validators.required),
    senha2: new FormControl(null, Validators.required),
  });

  constructor() { }

  ngOnInit() {
  }

  save() {

  }

  formValid() {
    return this.formCadastro.valid;
  }

}
