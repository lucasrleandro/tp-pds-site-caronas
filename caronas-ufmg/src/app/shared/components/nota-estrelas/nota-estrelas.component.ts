import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nota-estrelas',
  templateUrl: './nota-estrelas.component.html',
  styleUrls: ['./nota-estrelas.component.scss'],
})
export class NotaEstrelasComponent implements OnInit {

  @Input() stars = 0;

  amountText = '';

  constructor(private modalCtrl: ModalController) {

  }

  ngOnInit() {
    if (!this.stars) this.stars = 5;
  }
}
