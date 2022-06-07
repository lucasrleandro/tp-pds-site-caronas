import { Component, OnInit } from '@angular/core';
import { Carona, CaronasService } from 'src/app/shared/services/caronas.service';

@Component({
  selector: 'app-passageiro',
  templateUrl: './passageiro.page.html',
  styleUrls: ['./passageiro.page.scss'],
})
export class PassageiroPage implements OnInit {

  listaCaronas: Carona[] = [];

  constructor(private caronasService: CaronasService) { }

  ngOnInit() {

    this.caronasService.caronas.subscribe((caronas) => {
      if (caronas)
        this.listaCaronas = [...caronas];
    });

    this.caronasService.fetchAllCaronas().subscribe();

  }




}
