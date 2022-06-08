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
  carona: Carona;
  passageiro: string;
  situacao: string;
  motorista?: User;
}

export class SolicitacaoMotorista {
  _id: string;
  carona: Carona;
  passageiro: User;
  situacao: string;
  motorista?: string;
}

export class Carona {
  _id?: string;
  motorista: User;
  enderecoDestino: String;
  enderecoSaida: String;
  dataHorarioSaida: Date;
  ativa: Boolean;
  vagasOfertadas: number;
  vagasDisponiveis: number;
  veiculo: string;
  valor: String;
  passageiros: Passageiro;
  solicitacoesPendentes?: number; // apenas front
}

@Injectable({
  providedIn: 'root'
})
export class CaronasService {

  private _caronas = new BehaviorSubject<Carona[]>(null);
  private _solicitacoesPassageiro = new BehaviorSubject<SolicitacaoPassageiro[]>(null);
  private _caronasMotorista = new BehaviorSubject<Carona[]>(null);
  private _solicitacoesMotorista = new BehaviorSubject<SolicitacaoMotorista[]>(null);

  constructor(private http: HttpClient, private authService: AuthService) { }

  get caronas() {
    return this._caronas.asObservable();
  }

  get solicitacoesPassageiro() {
    return this._solicitacoesPassageiro.asObservable();
  }

  get caronasMotorista() {
    return this._caronasMotorista.asObservable();
  }

  get solicitacoesMotorista() {
    return this._solicitacoesMotorista.asObservable();
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
      carona: carona._id,
      motorista: carona.motorista._id,
      situacao: '0',
      passageiro: this.authService.getUserValue()._id
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
    return this.http.post(environment.urlApi + '/carona', carona)
      .pipe(tap(res =>
        this.fetchAllCaronasMotorista().subscribe()
      ));
  }

  fetchAllCaronasMotorista() {
    return this.http.get<{ caronas: Carona[] }>(environment.urlApi + '/carona/motorista/' + this.authService.getUserValue()._id)
      .pipe(tap(res => {
        this._caronasMotorista.next(res.caronas);
      }));
  }

  getCaronaMotoristaById(caronaId): Carona {

    if (!this._caronasMotorista.getValue()) return null;
    return this._caronasMotorista.getValue().find(c => c._id === caronaId);

  }

  fetchAllSolicitacoesMotorista() {

    return this.http.get<{ solicitacoesMotorista: SolicitacaoMotorista[] }>(environment.urlApi + '/solicitacoes-carona/motorista/' + this.authService.getUserValue()._id)
      .pipe(tap(res => {
        this._solicitacoesMotorista.next(res.solicitacoesMotorista);
      }))

  }

  aceitarSolicitacao(idSolicitacao: string) {
    return this.http.put(environment.urlApi + '/solicitacoes-carona/' + idSolicitacao, { situacao: 'Aceito', idSolicitacao: idSolicitacao }).pipe(tap(res => {
      this.fetchAllCaronasMotorista().subscribe();
      this.fetchAllSolicitacoesMotorista().subscribe();
    }));
  }

  recusarSolicitacao(idSolicitacao: string) {
    return this.http.put(environment.urlApi + '/solicitacoes-carona/' + idSolicitacao, { situacao: 'Recusado', idSolicitacao: idSolicitacao }).pipe(tap(res => {
      this.fetchAllCaronasMotorista().subscribe();
      this.fetchAllSolicitacoesMotorista().subscribe();
    }));
  }

  reset() {
    this._caronas.next(null);
    this._caronasMotorista.next(null);
    this._solicitacoesMotorista.next(null);
    this._solicitacoesPassageiro.next(null);
  }

}
