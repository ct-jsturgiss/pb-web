import { provideServerRendering, withRoutes } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

// primeng
import { providePrimeNG } from "primeng/config";
import { appTheme } from './app-theme';

const serverConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserAnimationsModule), 
    provideServerRendering(withRoutes(serverRoutes)),
    providePrimeNG({
            theme: {
                preset: appTheme,
				options: {
					darkModeSelector: false,
				}
            }
        })
    ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
