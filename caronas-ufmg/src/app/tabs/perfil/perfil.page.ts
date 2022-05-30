import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  formProfile = new FormGroup({
    nome: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    matricula: new FormControl(null, Validators.required),
    motorista: new FormControl(null, Validators.required),
    passageiro: new FormControl(null, Validators.required),
  });

  user = {
    nome: 'Lucas Leandro',
    email: 'lucasrleandro@gmail.com',
    matricula: 2018046815,
    motorista: true,
    passageiro: false
  };

  constructor() { }

  ngOnInit() {
    this.formProfile.patchValue(this.user);
  }

  formValid() {
    return this.formProfile.valid && (this.formProfile.get('passageiro').value || this.formProfile.get('motorista').value)
  }

  save() {

  }


}
