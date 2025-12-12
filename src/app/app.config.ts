import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { appTheme } from './app-theme';

export const appConfig: ApplicationConfig = {
  providers: [
	provideZoneChangeDetection({ eventCoalescing: true }), 
	provideRouter(routes), 
	provideClientHydration(withEventReplay()),
	provideAnimations(),
	provideHttpClient(withFetch()),
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
