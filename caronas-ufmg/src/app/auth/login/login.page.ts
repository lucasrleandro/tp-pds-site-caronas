import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin: FormGroup;
  mostrarSenha = false;

  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      matricula: new FormControl(null, Validators.compose([Validators.required])),
      senha: new FormControl(null, Validators.compose([Validators.required]))
    });

  }

  login() {

  }


}
