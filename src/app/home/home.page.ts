import { Component } from '@angular/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { LoadingController, ModalController, Platform, ToastController } from "@ionic/angular";
import { WifimodelComponent } from '../wifimodel/wifimodel.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public networks: Array<HotspotNetwork> = [];
  public isloading = false;
  constructor(
    private hotspot: Hotspot,
    private platform: Platform,
    private modalCtrl: ModalController,
    public toastController: ToastController
  ) {
    this.isloading = true;
    this.platform.ready().then(() => {
      this.presentToast("SUCCESS: Device is Ready");
      this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
        this.presentToast("ERROR: All networks founded");
        this.networks = networks;
        this.isloading = false;
      }).catch((err) => {
        this.presentToast(JSON.stringify(err));
        this.presentToast("ERROR: Cannot Scan WiFI");
        this.isloading = false;
      });

    }).catch((err) => {
      this.presentToast(JSON.stringify(err));
      this.presentToast("ERROR: Device Not Ready");
      this.isloading = false;
    })
  }


  async connect(ssid) {
    try {
      const modal = await this.modalCtrl.create({
        component: WifimodelComponent,
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
      this.presentToast("ERROR: Cannot Open the Model");
    }
  }



  public connectToNetwork(ssid, password) {
    this.hotspot.createHotspot(ssid, "WPA", password).then(() => {
      this.presentToast("SUCCESS: Successfully Connect to the network: " + ssid);
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
