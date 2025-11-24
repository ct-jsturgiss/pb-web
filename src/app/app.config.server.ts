import { provideServerRendering, withRoutes } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

// primeng
import { providePrimeNG } from "primeng/config";
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import { Preset } from '@primeuix/themes/types';

// Caretaker theme
const appPreset:Preset = {
	semantic: {
		primary: {
			50: '{red.50}',
            100: '{red.100}',
            200: '{red.200}',
            300: '{red.300}',
            400: '{red.400}',
            500: '{red.500}',
            600: '{red.600}',
            700: '{red.700}',
            800: '{red.800}',
            900: '{red.900}',
            950: '{red.950}'
		},
		colorScheme: {
			light: {
				surface: {
					0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
				}
			}
		}
	}
};

const appTheme = definePreset(Aura, appPreset);

const serverConfig: ApplicationConfig = {
  providers: [importProvidersFrom(BrowserAnimationsModule), provideServerRendering(withRoutes(serverRoutes)), providePrimeNG({
            theme: {
                preset: appTheme,
				options: {
					darkModeSelector: false,
				}
            }
        })]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
