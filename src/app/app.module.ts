import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './config/firebase.config';
import { TermsModalModule } from './shared/components/terms-modal/terms-modal.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';




@NgModule({
  declarations: [AppComponent, HeaderComponent, ],
  imports: [BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    TermsModalModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "../assets/i18n/" ,".json");
}