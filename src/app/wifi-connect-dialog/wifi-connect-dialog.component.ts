import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-wifi-connect-dialog',
  templateUrl: './wifi-connect-dialog.component.html',
  styleUrls: ['./wifi-connect-dialog.component.scss'],
})
export class WifiConnectDialogComponent {

  ssid: string;
  public password: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss({ ssid: this.ssid, password: this.password}, 'confirm');
  }

  handleInput(value) {
    this.password = value;
  }


}
