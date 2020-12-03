import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent} from './home/containers/home/home.component';
import {AgmCoreModule} from '@agm/core';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CoreComponent } from './core/core/core.component';
import { StoresComponent } from './stores/containers/stores/stores.component';
import { DialogFileUploadComponent } from './stores/components/dialog-file-upload/dialog-file-upload.component';
import { DialogHelpUploadComponent } from './stores/components/dialog-help-upload/dialog-help-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoreComponent,
    StoresComponent,
    DialogFileUploadComponent,
    DialogHelpUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    HammerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
