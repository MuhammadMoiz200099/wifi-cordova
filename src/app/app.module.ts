import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { WifiConnectDialogComponent } from './wifi-connect-dialog/wifi-connect-dialog.component';

@NgModule({
  declarations: [AppComponent, WifiConnectDialogComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [WifiWizard2, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
