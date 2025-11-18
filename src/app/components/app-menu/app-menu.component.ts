import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { NavigationEnd, provideRouter, Router, RouteReuseStrategy, RouterLink, RouterModule, withComponentInputBinding } from "@angular/router";

import MainMenuItemState from '../../models/core/main-menu-item-state';
import { MainMenuConstants } from '../../../constants/ui-constants';

@Component({
  selector: 'app-app-menu',
  imports: [CommonModule, ButtonModule, TooltipModule, RouterLink, RouterModule],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss',
  providers: [
	Router
]
})
export class AppMenuComponent {

	items:MenuItem[] = [];
	selectedMenuItem?:MenuItem = undefined;

	constructor(
		private messageService: MessageService,
		private router:Router
	) {}

	ngOnInit() {
		this.items = MainMenuConstants.MainMenuItems;
		this.router.events.subscribe((e) => {
			if(e instanceof NavigationEnd) {
				this.updateSelectedFromNavigation(e);
			}
		});
	}



	getMenuItemSeverity(item:MenuItem) {
		const state:MainMenuItemState|undefined = item?.state as MainMenuItemState;
		return (state?.selected ?? false) ? "primary" : "secondary";
	}

	updateSelectedMenuItem() {
		for (const item of this.items) {
			if(item.id === this.selectedMenuItem?.id) {
				item.state = {
					...item.state,
					selected: true,
				}
			} else {
				item.state = {
					...item.state,
					selected: false,
				}
			}
		}
	}

	updateSelectedFromNavigation(event:NavigationEnd) {
		if(!this.selectedMenuItem) {
			this.selectedMenuItem = this.items.find(i => `/${i.routerLink}` === event.url);
		}
		this.updateSelectedMenuItem();
	}

	onMenuItemClicked(event:MouseEvent, itemId:string|undefined) {
		console.log("clicked", itemId);
		const clickedItem:MenuItem|undefined = this.items.find(i => i.id === itemId);
		if(clickedItem) {
			this.selectedMenuItem = clickedItem;
			this.updateSelectedMenuItem();
			//console.debug(clickedItem);
			this.messageService.add({
				severity: "info",
				summary: "Main Menu Item Clicked",
				detail: `You've clicked '${clickedItem.label}'`,
				life: 3000,
			});
			
		}
	}
}
