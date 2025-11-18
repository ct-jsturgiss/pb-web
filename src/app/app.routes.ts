import { Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { NotFoundComponent } from './components/status/not-found/not-found.component';
import { MainMenuKeys } from '../constants/ui-constants';
import { IvLookupComponent } from './components/inventory/iv-lookup/iv-lookup.component';

export const routes: Routes = [
	{
		path: '',
		component: MainContentComponent
	},
	{
		path: MainMenuKeys.InventoryLookup.routerLink,
		component: IvLookupComponent
	},
	{
		path: "**",
		component: NotFoundComponent
	}
];
