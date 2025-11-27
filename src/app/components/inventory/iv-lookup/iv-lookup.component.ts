import { Component, model, ModelSignal } from '@angular/core';

// primeng
import { IconField } from "primeng/iconfield"
import { InputIcon } from "primeng/inputicon"
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table"
import { SkeletonModule } from "primeng/skeleton"

// pb
import { ApiQueryRequest } from '../../../services/api-interfaces';
import { first, Observable } from 'rxjs';
import { InventoryApiService } from '../../../services/inventory/inventory-service';
import { InventoryLookup, InventoryLookupAdapter } from '../../../models/inventory/inventory-lookup';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'pb-iv-lookup',
	imports: [IconField, InputIcon, InputTextModule, TableModule, SkeletonModule, AsyncPipe],
	templateUrl: './iv-lookup.component.html',
	styleUrl: './iv-lookup.component.scss',
	providers: [InventoryLookupAdapter, InventoryApiService],
})
export class IvLookupComponent {

	private m_api:InventoryApiService;

	public m_loadingData:ModelSignal<boolean> = model<boolean>(false);
	public m_itemData:Observable<InventoryLookup[]> = new Observable<InventoryLookup[]>();

	constructor(api:InventoryApiService) {
		this.m_api = api;
	}

	ngOnInit() {

		this.m_loadingData.set(true);
		this.m_itemData = this.m_api.executeQuery(this.getItemListRequest());
		this.m_itemData.pipe(first()).subscribe(v => {
			this.m_loadingData.set(false);
		});
	}

	// Queries

	getItemListRequest():ApiQueryRequest {

		return new ApiQueryRequest()
			.setUri(`inventory/items`)
			.setPageSize(100);
	}
}
