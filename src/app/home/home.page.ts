import { Component, OnInit } from '@angular/core';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { WifiConnectDialogComponent } from '../wifi-connect-dialog/wifi-connect-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public ssids: any = [];

  constructor(
    private wifiWizard2: WifiWizard2,
    private platform: Platform,
    private modalCtrl: ModalController,
    public toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.presentToast("SUCCESS: Device is Ready");
      if (this.platform.is('cordova')) {
        this.wifiWizard2.scan().then((res) => {
          this.ssids = res
          console.log(res);
          this.presentToast("SUCCESS: Scaned all near by networks");
        }).catch((err) => {
          this.presentToast(err);
          this.presentToast("ERROR: Cannot Scan WiFI");
        });
      }
    }).catch((err) => {
      this.presentToast(err);
      this.presentToast("ERROR: Device Not Ready");
    });
  }

  async connect(ssid) {
    try {
      const modal = await this.modalCtrl.create({
        component: WifiConnectDialogComponent,
        componentProps: {
          ssid
        }
      });
      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        this.connectToNetwork(ssid, data);
      }
    } catch (err) {
      this.presentToast(err);
      this.presentToast("ERROR: Cannot Open the Model");
    }
  }


  public connectToNetwork(ssid, password) {
    this.wifiWizard2.connect(ssid, true, password, "WPA").then((result) => {
      console.log(result);
      this.presentToast("SUCCESS: Successfully Connect to the network" + ssid);
    }).catch((err) => {
      this.presentToast(err);
      this.presentToast("ERROR: Connot Connect to a Network");
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


}
