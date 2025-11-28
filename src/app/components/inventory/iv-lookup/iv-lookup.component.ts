import { Component, input, model, ModelSignal } from '@angular/core';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table"
import { SkeletonModule } from "primeng/skeleton"
import { ProgressSpinnerModule } from "primeng/progressspinner"

// pb
import { ApiQueryRequest } from '../../../services/api-interfaces';
import { BehaviorSubject, first, map, Observable, of } from 'rxjs';
import { InventoryApiService } from '../../../services/inventory/iv-api-service';
import { InventoryLookup, InventoryLookupAdapter } from '../../../models/inventory/inventory-lookup';
import { AsyncPipe } from '@angular/common';
import { containsAsString } from '../../../services/core/helpers';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'pb-iv-lookup',
	imports: [InputTextModule, TableModule, SkeletonModule, AsyncPipe, FormsModule, ProgressSpinnerModule],
	templateUrl: './iv-lookup.component.html',
	styleUrl: './iv-lookup.component.scss',
	providers: [InventoryLookupAdapter, InventoryApiService],
})
export class IvLookupComponent {

	private m_api:InventoryApiService;

	public isQuerying:ModelSignal<boolean> = model<boolean>(false);
	public isLoading:ModelSignal<boolean> = model<boolean>(false);
	public lookupStore:BehaviorSubject<InventoryLookup[]> = new BehaviorSubject<InventoryLookup[]>([]);
	public lookupView:BehaviorSubject<InventoryLookup[]> = new BehaviorSubject<InventoryLookup[]>([]);
	public searchPattern = input<string>("");

	constructor(api:InventoryApiService) {
		this.m_api = api;
	}

	ngOnInit() {

		this.isQuerying.set(true);
		const sub = this.m_api.executeQuery<InventoryLookup>(this.getItemListRequest());
		sub.pipe(first()).subscribe(v => {
			this.lookupStore.next(v);
			this.filterItems(v);
			this.isQuerying.set(false);
		});
	}

	// Functions
	filterItems(items:InventoryLookup[]) {
		const searchStr = this.searchPattern() ?? "";
		this.isLoading.set(true);
		if(!searchStr) {
			this.lookupView.next(items);
		} else {
			let filteredItems:InventoryLookup[] = items;
			filteredItems = filteredItems.filter(v => {
				let ret = false;
				if(containsAsString(v.ItemCode, searchStr)) {
					ret = true;
				}
				if(containsAsString(v.ItemName, searchStr)) {
					ret = true;
				}

				return ret;
			});

			this.lookupView.next(filteredItems);
		}
		this.isLoading.set(false);
	}

	// Queries

	getItemListRequest():ApiQueryRequest {

		return new ApiQueryRequest()
			.setUri(`inventory/items`)
			.setPageSize(100);
	}

	// Event Handlers

	onSearchPatternChanged(value:string) {
		this.filterItems(this.lookupStore.value);
	}
}
