import { MenuItem, PrimeIcons } from "primeng/api";
import MainMenuItemState from "../app/models/core/main-menu-item-state";

/* Main Menu */

export class MainMenuKeys {

	static readonly Home = {
		id: "root-home",
		label: "Home",
		icon: PrimeIcons.HOME,
		tooltip: "Home",
		routerLink: ""
	} as const;

	static readonly InventoryLookup = {
		id: "iv-lookup",
		label: "Inventory Lookup",
		icon: PrimeIcons.BARCODE,
		tooltip: "Inventory Lookup",
		routerLink: "iv-lookup"
	} as const;

	static readonly BomManagement = {
		id: "bom-manage",
		label: "BOM Management",
		icon: PrimeIcons.SITEMAP,
		tooltip: "BOM Management",
	} as const;
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
		}
	] as const;
}
