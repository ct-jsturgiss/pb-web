import { Component, model, ModelSignal } from '@angular/core';

// primeng
import { IconField } from "primeng/iconfield"
import { InputIcon } from "primeng/inputicon"
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table"
import { SkeletonModule } from "primeng/skeleton"
import { ProgressSpinnerModule } from "primeng/progressspinner"

// pb
import { ApiQueryRequest } from '../../../services/api-interfaces';
import { BehaviorSubject, first, map, Observable, of } from 'rxjs';
import { InventoryApiService } from '../../../services/inventory/inventory-service';
import { InventoryLookup, InventoryLookupAdapter } from '../../../models/inventory/inventory-lookup';
import { AsyncPipe } from '@angular/common';
import { containsAsString } from '../../../services/core/helpers';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'pb-iv-lookup',
	imports: [IconField, InputIcon, InputTextModule, TableModule, SkeletonModule, AsyncPipe, FormsModule, ProgressSpinnerModule],
	templateUrl: './iv-lookup.component.html',
	styleUrl: './iv-lookup.component.scss',
	providers: [InventoryLookupAdapter, InventoryApiService],
})
export class IvLookupComponent {

	private m_api:InventoryApiService;

	public m_queryingData:ModelSignal<boolean> = model<boolean>(false);
	public m_loading:ModelSignal<boolean> = model<boolean>(false);
	public m_itemData:BehaviorSubject<InventoryLookup[]> = new BehaviorSubject<InventoryLookup[]>([]);
	public m_searchPattern:ModelSignal<string> = model<string>("");
	public m_itemView:BehaviorSubject<InventoryLookup[]> = new BehaviorSubject<InventoryLookup[]>([]);

	constructor(api:InventoryApiService) {
		this.m_api = api;
		this.m_searchPattern.subscribe(this.onSearchPatternChanged.bind(this));
	}

	ngOnInit() {

		this.m_queryingData.set(true);
		const sub = this.m_api.executeQuery<InventoryLookup>(this.getItemListRequest());
		sub.pipe(first()).subscribe(v => {
			this.m_itemData.next(v);
			this.filterItems(v);
			this.m_queryingData.set(false);
		});
	}

	// Functions
	filterItems(items:InventoryLookup[]) {
		this.m_loading.set(true);
		if(!this.m_searchPattern()) {
			this.m_itemView.next(items);
		} else {
			const strPattern = this.m_searchPattern() ?? "";
			let filteredItems:InventoryLookup[] = items;
			filteredItems = filteredItems.filter(v => {
				let ret = false;
				if(containsAsString(v.ItemCode, strPattern)) {
					ret = true;
				}
				if(containsAsString(v.ItemName, strPattern)) {
					ret = true;
				}

				return ret;
			});

			this.m_itemView.next(filteredItems);
		}
		this.m_loading.set(false);
	}

	// Queries

	getItemListRequest():ApiQueryRequest {

		return new ApiQueryRequest()
			.setUri(`inventory/items`)
			.setPageSize(100);
	}

	// Event Handlers

	onSearchPatternChanged(value:string) {
		this.filterItems(this.m_itemData.value);
	}
}
