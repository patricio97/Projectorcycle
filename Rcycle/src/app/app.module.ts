import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { PipesComponent } from './pipes/pipes.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Plugin } from '@awesome-cordova-plugins/core';

registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent, PipesComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, {provide: LOCALE_ID, useValue:"es"}, SQLite],
  bootstrap: [AppComponent],
})


export class AppModule {}
