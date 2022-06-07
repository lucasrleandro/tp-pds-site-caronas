import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  statusChange: Subject<ConnectionStatus> = new Subject<ConnectionStatus>();

  constructor() { }

  public netStatusChange(state: ConnectionStatus) {
    this.statusChange.next(state);
  }

  async getStatus() {
    const status = await Network.getStatus();
    this.statusChange.next(status);
  }
}
