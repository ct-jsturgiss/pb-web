import { Routes } from '@angular/router';
import { MainContentComponent } from './components/app-menu/pages/main-content/main-content.component';
import { NotFoundComponent } from './components/status/not-found/not-found.component';
import { MainMenuKeys } from '../constants/ui-constants';
import { IvLookupPageComponent } from './components/app-menu/pages/iv-lookup/iv-lookup-page/iv-lookup-page.component';

export const routes: Routes = [
	{
		path: '',
		component: MainContentComponent
	},
	{
		path: MainMenuKeys.InventoryLookup.routerLink,
		component: IvLookupPageComponent
	},
	{
		path: "**",
		component: NotFoundComponent
	}
];
