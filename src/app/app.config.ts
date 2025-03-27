import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function provideValue(token: any, value: any): Provider {
  return { provide: token, useValue: value };
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), importProvidersFrom(BrowserAnimationsModule),
    provideValue('windowObject', window)
  ]
};
