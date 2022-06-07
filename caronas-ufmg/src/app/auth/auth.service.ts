import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { BehaviorSubject, from } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlertService } from '../shared/services/alert.service';
import { Storage } from '@capacitor/storage'

export class User {
  nome: string;
  email: string;
  senha: string;
  ePassageiro: boolean;
  eMotorista: boolean;
  _id?: string;
  __v?: number;
  token?: string;
}

export interface AuthResponseData {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RiOGZjNTg3MzdjNjQ3OGMxZmI4Y2UiLCJpYXQiOjE1NTg0NTA1NTJ9.iXkccbovs3xQjd0ETlASehVQiyBAMlhY50wF7DY2mk8';
  user: User;
  isRegister?: boolean;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private _user = new BehaviorSubject<User>(null); // atualiza os objetos de usuario
  private _logged = new BehaviorSubject<boolean>(null); // atualiza o usuario apenas login/logout

  constructor(private http: HttpClient) { }

  get logged() {
    return this._logged.asObservable();
  }

  get user() {
    return this._user.asObservable();
  }

  async syncUserData() {
    let updatedUser = await this.getUserInfo(this.getUserValue()._id).toPromise();
    updatedUser.token = this._user.getValue().token;

    this._user.next(updatedUser);
  }

  login(email: string, senha: string) {
    return this.http
      .post<AuthResponseData>(environment.urlApi + '/usuarios/login', {
        email: email,
        senha: senha,
      })
      .pipe(tap(this.setUserData.bind(this)));
  }

  register(user: User) {
    return this.http
      .post<AuthResponseData>(environment.urlApi + '/usuarios', user)
      .pipe(tap(this.setUserData.bind(this)));
  }

  updateUser(user) {

    user.id = this.getUserValue()._id;

    return this.http
      .put<AuthResponseData>(environment.urlApi + '/usuarios/' + this.getUserValue()._id, user)
      .pipe(tap(() => {
        this.syncUserData();
      }));
  }

  private async setUserData(userData: AuthResponseData) {

    let user = userData.user;
    user.token = userData.token;

    this._user.next(user);
    this._logged.next(true);

    await this.storeauth_caronas(
      user._id,
      user.nome,
      user.email,
      user.token
    );

  }

  async storeauth_caronas(
    userId: string,
    nome: string,
    email: string,
    token: string
  ) {
    let stored = await Storage.get({ key: 'auth_caronas' });

    if (stored && stored.value) {
      let storedJ = JSON.parse(stored.value);
      if (storedJ['userId'].toString().trim() !== userId.toString().trim()) {
        await Storage.clear();
      }
    }

    const data = JSON.stringify({
      userId: userId,
      nome: nome,
      email: email,
      token: token,
    });

    await Storage.set({ key: 'auth_caronas', value: data });
  }

  async logout() {

    this._logged.next(null);
    this._user.next(null);
    await Storage.clear();

  }

  getUserInfo(userId) {
    return this.http.get<any>(environment.urlApi + '/usuarios/' + userId).pipe(map(res => res = res.usuario));
  }

  autoLogin() {

    // from resolve uma promise e retorna uma observable
    return from(Storage.get({ key: 'auth_caronas' })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          userId: string;
          nome: string;
          email: string;
          token: string;
        };
        return parsedData;
      }),
      tap((user) => {
        if (user) {

          let aux = new User();
          aux.token = user.token;

          this._user.next(aux);

          this.getUserInfo(user.userId)
            .subscribe(async (u) => {
              // verifica se as informacoes do storage estao corretas
              // se o chat esta atualizado ou se o login e o mesmo do storage
              await this.storeauth_caronas(u._id, u.nome, u.email, user.token);

              u.token = user.token;

              this._user.next(u);
              this._logged.next(true);

            });
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  getUserValue(): User {
    return this._user.getValue();
  }


}
