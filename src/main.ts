import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideStore } from '@ngrx/store';

import { routes } from '@app/app-routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideStore(),
    importProvidersFrom(
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
    ),
  ],
}).catch(e => console.error(e));
