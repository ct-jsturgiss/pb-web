import { MenuItem, PrimeIcons } from "primeng/api";
import MainMenuItemState from "../app/models/core/main-menu-item-state";

/* Main Menu */

export interface MainMenuKey {
	id:string;
	label:string;
	icon:keyof PrimeIcons;
	tooltip:string;
	routerLink?:string;
}

export class MainMenuKeys {

	static readonly Home = {
		id: "root-home",
		label: "Home",
		icon: PrimeIcons.HOME,
		tooltip: "Home",
		routerLink: ""
	} as const as MainMenuKey;

	static readonly InventoryLookup = {
		id: "iv-lookup",
		label: "Inventory Lookup",
		icon: PrimeIcons.BARCODE,
		tooltip: "Inventory Lookup",
		routerLink: "iv-lookup"
	} as const as MainMenuKey;

	static readonly BomManagement = {
		id: "bom-manage",
		label: "BOM Management",
		icon: PrimeIcons.SITEMAP,
		tooltip: "BOM Management",
	} as const as MainMenuKey;

	static readonly ConfigurationMenu = {
		id: "config-manage",
		label: "Configuration",
		icon: PrimeIcons.COG,
		tooltip: "Configuration",
		routerLink: "config-manage"
	} as const as MainMenuKey;
}

export class MainMenuConstants {

	static readonly DefaultMainMenuItemState:MainMenuItemState = {
		selected: false
	} as const;

	static readonly MainMenuItems:MenuItem[] = [
		{
			...MainMenuKeys.Home,
			state: {...this.DefaultMainMenuItemState},
		},
		{
			...MainMenuKeys.InventoryLookup,
			state: {...this.DefaultMainMenuItemState},
		},
		{
			...MainMenuKeys.BomManagement,
			state: {...this.DefaultMainMenuItemState},
		},
		{
			...MainMenuKeys.ConfigurationMenu,
			state: {...this.DefaultMainMenuItemState},
		}
	] as const;
}

/* Config Manage Menu */

export const ConfigManageMenu = {
	inventory: {
		ivunits: "iv-units"
	}
} as const;

export const ConfigManageMenuItems = [
	{
		id: "inventory",
		label: "Inventory",
		icon: PrimeIcons.WAREHOUSE,
		items: [
			{
				id: ConfigManageMenu.inventory.ivunits,
				label: "Units Of Measure",
			}
		]
	}
] as const as MenuItem[];

/* Constants */

export const AppConst = {
	placeholders: {
		emptyValue: "---"
	}
}

export const InventoryConst = {
	ivLeafs: {
		firstLevel: 1,
		lastLevel: 7
	}
}