import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode, ErrorHandler, Injectable } from '@angular/core';
import { QuicklinkModule } from 'ngx-quicklink';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule, UserTrackingService, ScreenTrackingService, DEBUG_MODE as ANALYTICS_DEBUG_MODE } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/performance';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import * as Sentry from '@sentry/browser';
import { LayoutComponent } from './components/layout/layout.component';
import { P404Component } from './components/p404/p404.component';
import { HaeaderComponent } from './components/haeader/haeader.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ToastrModule } from 'ngx-toastr';

if (environment.production) {
  Sentry.init({
    dsn: environment.sentryUrl
  });
}
@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    Sentry.showReportDialog({ eventId });
  }
}
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    P404Component,
    HaeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    QuicklinkModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirePerformanceModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    SharedModule,
    CoreModule,
    LayoutModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    UserTrackingService,
    ScreenTrackingService,
    PerformanceMonitoringService,
    {
      provide: ANALYTICS_DEBUG_MODE, useFactory: () => isDevMode()
    },
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
