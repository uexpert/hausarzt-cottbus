import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, Provider } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { de_DE, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { AccountBookFill, AlertFill, AlertOutline, WarningFill, EditFill, FilePdfTwoTone, PlusOutline, FilePdfOutline, DeleteFill,
         SyncOutline, FileAddTwoTone, FileAddOutline, AppstoreFill, FolderFill, FolderOpenFill, EnvironmentOutline, MailOutline,
         PhoneOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill,
                                  WarningFill, EditFill, FilePdfTwoTone,
                                  PlusOutline, DeleteFill, SyncOutline, FileAddTwoTone,
                                  FilePdfOutline, FileAddOutline, AppstoreFill,
                                  FolderFill, FolderOpenFill, EnvironmentOutline,
                                  MailOutline, PhoneOutline
                                ];

registerLocaleData(de);


export function provideValue(token: any, value: any): Provider {
  return { provide: token, useValue: value };
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({scrollPositionRestoration: 'enabled'})), importProvidersFrom(BrowserAnimationsModule),
    provideValue('windowObject', window), provideNzI18n(de_DE), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),
    importProvidersFrom(NzIconModule.forRoot(icons))
  ]
};
