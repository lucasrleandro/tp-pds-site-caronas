import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, take } from 'rxjs/operators';
import { ToastService } from '../services/toast-service';
import { AlertController, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Network } from '@capacitor/network';


@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let headers: HttpHeaders;

    if (!request.url.includes('viacep') && !request.url.includes('googleapis')) {

      if (this.authService.getUserValue()) {
        headers = new HttpHeaders({
          Authorization: `Bearer ${this.authService.getUserValue().token}`
        });
      }

    }

    const dupReq = request.clone({ headers: headers });

    return next.handle(dupReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          this.toastService.makeToastErrorDefault();
        } else {
          // server-side error

          if (error.error && error.error.code) {

            if (error.error.code === 'update_app')
              this.navCtrl.navigateRoot('/blocked/outdated');
            else if (error.error.code === 'banned')
              this.navCtrl.navigateRoot('/blocked/banned');
            else if (error.error.code === 'token_expired')
              this.authService.logout();
          }

          if (error.error && error.error.message) {
            this.showError(error.error.message);
          } else {
            this.showError(null);
          }
        }
        return throwError(error.error);
      })
    );
  }


  async showError(errorMsg) {
    let networkStatus = await Network.getStatus();
    if (!networkStatus.connected) {
      this.toastService.makeToastInternet(false); // sem conexao
    } else if (errorMsg && errorMsg.toString().length > 0) {
      this.toastService.makeToast(errorMsg, 4000); // msg de erro do back
    } else {
      this.toastService.makeToastErrorDefault(); // msg de erro padrao
    }
  }
}
