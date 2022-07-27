import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-wifimodel',
  templateUrl: './wifimodel.component.html',
  styleUrls: ['./wifimodel.component.scss'],
})
export class WifimodelComponent {

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
