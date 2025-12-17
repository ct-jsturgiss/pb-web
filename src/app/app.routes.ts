import { Routes } from '@angular/router';
import { MainContentComponent } from './components/pages/main-content/main-content.component';
import { NotFoundComponent } from './components/status/not-found/not-found.component';
import { MainMenuKeys } from '../constants/ui-constants';
import { IvLookupPageComponent } from './components/pages/iv-lookup/iv-lookup-page/iv-lookup-page.component';
import { ConfigManageComponent } from './components/pages/config-manage/config-manage.component';

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
		path: MainMenuKeys.ConfigurationMenu.routerLink,
		component: ConfigManageComponent
	},
	{
		path: "**",
		component: NotFoundComponent
	}
];
