import { Component, OnInit } from '@angular/core';
import { Carona, CaronasService } from 'src/app/shared/services/caronas.service';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.page.html',
  styleUrls: ['./busca.page.scss'],
})
export class BuscaPage implements OnInit {

  listaCaronas: Carona[];

  constructor(private caronasService: CaronasService) { }

  ngOnInit() {

    this.caronasService.caronas.subscribe((caronas) => {
      this.listaCaronas = caronas;
    });

  }

  load(event?) {
    this.caronasService.fetchAllCaronas().subscribe();
    this.caronasService.fetchAllSolicitacoesPassageiro().subscribe();
    if (event) event.target.complete();
  }

}
