import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform, NavController, LoadingController } from '@ionic/angular';

import { Router } from '@angular/router';
import { AuthService, User } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NetworkService } from './shared/services/network.service';
import { ToastService } from './shared/services/toast-service';
import { PluginListenerHandle } from '@capacitor/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AlertService } from './shared/services/alert.service';
import { CaronasService } from './shared/services/caronas.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  networkStatus: ConnectionStatus;
  networkListener: PluginListenerHandle;

  showTabs = true;

  deepLinksTrying = 0;

  authSub: Subscription;
  pushRegistered = false;

  wasLogged = false;

  _user: User;

  emailToVerify = null;
  openNotifications = false;


  constructor(
    private platform: Platform,
    private authService: AuthService,
    private navController: NavController,
    private networkService: NetworkService,
    private toastService: ToastService,
    private caronasService: CaronasService,
  ) {

  }

  async getStatus() {
    this.networkStatus = await Network.getStatus();
    if (!this.networkStatus.connected) {
      this.toastService.makeToastInternet(false);
    }
  }


  startNetwork() {
    this.networkListener = Network.addListener(
      'networkStatusChange',
      (status) => {

        if ((!this.networkStatus.connected && status.connected) || !status.connected)
          this.toastService.makeToastInternet(status.connected);

        this.networkStatus = status;

        if (!status.connected)
          this.networkService.netStatusChange(status);

      }
    );
  }


  ngOnInit() {

    this.start();

    this.platform.ready().then(() => {

      if (this.platform.is('mobile') && this.platform.is('hybrid'))
        SplashScreen.hide();

    });

    this.authSub = this.authService.logged.subscribe((logged) => {

      if (!logged && this.wasLogged)
        this.onLogout();

      if (logged)
        this.onLogin();

      this.wasLogged = logged;

    });

    if (this.platform.is('mobile') && this.platform.is('hybrid')) {

      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setStyle({ style: Style.Light });
      StatusBar.setBackgroundColor({ color: '#FFFFFF' });

    }

  }

  async start() {
    this.startNetwork();
    this.getStatus();
    this.autoLogin();
  }

  onLogout() {
    this.navController.navigateRoot('/');
    this.caronasService.reset();
  }

  onLogin() {

    this.caronasService.fetchAllCaronas().subscribe();
    this.caronasService.fetchAllCaronasMotorista().subscribe();
    this.caronasService.fetchAllSolicitacoesMotorista().subscribe();
    this.caronasService.fetchAllSolicitacoesPassageiro().subscribe();

  }

  async autoLogin() {
    await this.authService.autoLogin().toPromise();
  }


  ngOnDestroy() {
    this.networkListener.remove();

    if (this.authSub)
      this.authSub.unsubscribe();
  }

}
