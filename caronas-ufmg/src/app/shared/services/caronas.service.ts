import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

export class Passageiro {

}

export class Carona {
  _id?: string;
  motorista: User;
  enderecoDestino: String;
  enderecoSaida: String;
  dataHorarioSaida: Date;
  ativa: Boolean;
  vagasOfertadas: Number;
  vagasDisponiveis: Number;
  veiculo: string;
  valor: String;
  passageiros: Passageiro;
}

@Injectable({
  providedIn: 'root'
})
export class CaronasService {

  private _caronas = new BehaviorSubject<any>(null); // atualiza os objetos de usuario

  constructor(private http: HttpClient) { }

  get caronas() {
    return this._caronas.asObservable();
  }

  fetchAllCaronas() {

    return this.http.get<{ carona: Carona[] }>(environment.urlApi + '/carona').pipe(tap(res => {
      this._caronas.next(res.carona);
    }))

  }

}
