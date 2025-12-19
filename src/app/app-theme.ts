// primeng
import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";
import { Preset } from '@primeuix/themes/types';

// Caretaker theme
const colors ={
    caretaker_red: "#ED2426",
    caretaker_red_dark: "#8E1516",// "#BD1C1E",
    caretaker_red_light: "#F04F51",
    lightgray: "#DDD",
}

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
				},
			}
		},
	},
    components: {
        datatable: {
            colorScheme: {
                light: {
                    row: {
                        hoverBackground: colors.lightgray,
                        selectedColor: "white",
                        selectedBackground: colors.caretaker_red + "CC"
                    },
                }
            }
        },
        panelmenu: {
            colorScheme: {
                light: {
                    panel: {
                        borderColor: '{stone.400}'
                    }
                }
            }
        },
        toolbar: {
            colorScheme: {
                light: {
                    root: {
                        borderColor: '{stone.400}'
                    }
                }
            }
        },
        progressspinner: {
            colorScheme: {
                light: {
                    root: {
                        colorOne: colors.caretaker_red,
                        colorTwo: colors.caretaker_red,
                        colorThree: colors.caretaker_red_dark,
                        colorFour: colors.caretaker_red_dark
                    }
                }
            },
        }
    }
};

export const appTheme = definePreset(Aura, appPreset);