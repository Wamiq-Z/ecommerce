import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { StoreModule, StoreRootModule } from '@ngrx/store';
import { rootReducers } from './app/state/store';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.log(err)
);
