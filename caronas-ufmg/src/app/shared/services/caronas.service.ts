import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService, User } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

export class Passageiro {

}

export class SolicitacaoPassageiro {
  _id: string;
  idCarona: string;
  idPassageiro: string;
  situacao: StatusSolicitacao
}

export enum StatusSolicitacao {
  Pendente = 0,
  Aceito = 1,
  Recusado = 2,
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

  private _caronas = new BehaviorSubject<Carona[]>(null); // atualiza os objetos de usuario
  private _solicitacoesPassageiro = new BehaviorSubject<SolicitacaoPassageiro[]>(null); // atualiza os objetos de usuario


  constructor(private http: HttpClient, private authService: AuthService) { }

  get caronas() {
    return this._caronas.asObservable();
  }

  get solicitacoesPassageiro() {
    return this._solicitacoesPassageiro.asObservable();
  }

  fetchAllCaronas() {

    return this.http.get<{ carona: Carona[] }>(environment.urlApi + '/carona').pipe(tap(res => {
      this._caronas.next(res.carona);
    }))

  }

  getCaronaLocalById(caronaId): Carona {

    if (!this._caronas.getValue()) return null;
    return this._caronas.getValue().find(c => c._id === caronaId);

  }

  solicitarCarona(carona: Carona) {
    return this.http.post(environment.urlApi + '/solicitacoes-carona', {
      idCarona: carona._id,
      motorista: carona.motorista._id,
      situacao: 'PENDENTE',
      idPassageiro: this.authService.getUserValue()._id
    }).pipe(tap(res => {
      this.fetchAllSolicitacoesPassageiro().subscribe();
    }));
  }


  fetchAllSolicitacoesPassageiro() {

    return this.http.get<{ solicitacoesPassageiro: SolicitacaoPassageiro[] }>(environment.urlApi + '/solicitacoes-carona/passageiro/' + this.authService.getUserValue()._id)
      .pipe(tap(res => {
        this._solicitacoesPassageiro.next(res.solicitacoesPassageiro);
      }))

  }

  getSolicitacoesValue() {
    return this._solicitacoesPassageiro.getValue();
  }

  cancelarSolicitacao(caronaId) {
    return this.http.delete(environment.urlApi + '/solicitacoes-carona/' + caronaId).pipe(tap(res => {
      this.fetchAllSolicitacoesPassageiro().subscribe();
    }));
  }

  criarCarona(carona: Carona) {
    return this.http.post(environment.urlApi + '/carona', carona);
  }

}
