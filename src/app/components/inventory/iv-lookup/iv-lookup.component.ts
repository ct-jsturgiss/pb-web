import { Component, input, InputSignal, model, ModelSignal, SimpleChanges } from '@angular/core';

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
import { LookupMode } from '../../../models/core/lookup-mode';
import { IvLookupQuestionGridComponent } from '../iv-lookup-question-grid/iv-lookup-question-grid.component';
import { IvLookupSelection } from '../../../models/inventory/inventory-lookup-selection';

@Component({
	selector: 'pb-iv-lookup',
	imports: [InputTextModule, TableModule, SkeletonModule, AsyncPipe, 
		FormsModule, ProgressSpinnerModule, IvLookupQuestionGridComponent],
	templateUrl: './iv-lookup.component.html',
	styleUrl: './iv-lookup.component.scss',
	providers: [InventoryApiService],
})
export class IvLookupComponent {

	private m_api:InventoryApiService;

	public isQuerying:ModelSignal<boolean> = model<boolean>(false);
	public isLoading:ModelSignal<boolean> = model<boolean>(false);
	public lookupStore:BehaviorSubject<InventoryLookup[]> = new BehaviorSubject<InventoryLookup[]>([]);
	public lookupView:BehaviorSubject<InventoryLookup[]> = new BehaviorSubject<InventoryLookup[]>([]);
	public selected:BehaviorSubject<InventoryLookup> = new BehaviorSubject<InventoryLookup>(new InventoryLookup(-1,"","", ""));
	public searchPattern = input<string>("");
	public lookupMode:ModelSignal<LookupMode> = model<LookupMode>(LookupMode.SearchPattern);
	public leafSelection:BehaviorSubject<IvLookupSelection> = new BehaviorSubject<IvLookupSelection>(new IvLookupSelection([]));

	constructor(api:InventoryApiService) {
		this.m_api = api;

		// Subscriptions
		this.selected.subscribe(this.onSelectedChanged);
	}

	ngOnInit() {
		this.isQuerying.set(true);
		const sub = this.m_api.listInventoryLookups(this.getLookupsRequest());
		sub.pipe(first()).subscribe(async v => {
			this.lookupStore.next(v);
			await this.filterItems(v);
			this.isQuerying.set(false);
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if(changes["searchPattern"]) {
			if(this.lookupMode() !== LookupMode.SearchPattern) {
				this.lookupMode.set(LookupMode.SearchPattern);
			}
			this.filterItems(this.lookupStore.getValue());
		}
	}

	// Functions

	async filterItems(items:InventoryLookup[]) {
		this.isLoading.set(true);
		if(this.lookupMode() === LookupMode.SearchPattern) {
			const searchStr = this.searchPattern() ?? "";
			if(!searchStr) {
				this.lookupView.next(items);
			} else {
				let filteredItems:InventoryLookup[] = items;
				await new Promise<void>((resolve) => {
					filteredItems = filteredItems.filter(v => {
						let ret = false;
						if(containsAsString(v.itemCode, searchStr)) {
							ret = true;
						}
						if(containsAsString(v.itemName, searchStr)) {
							ret = true;
						}

						return ret;
					});
					resolve();
				});

				this.lookupView.next(filteredItems);
			}
		} else {
			const targetPath:string = this.leafSelection.getValue().selectionPath;
			let items = this.lookupStore.getValue();
			items = items.filter(l => (l.pathId ?? "").startsWith(targetPath));
			this.lookupView.next(items);
		}
		this.isLoading.set(false);
	}

	// Queries

	getLookupsRequest():ApiQueryRequest {
		return new ApiQueryRequest()
			.setUri(`inventory/items`);
	}

	// Handlers

	onSelectedChanged(item:InventoryLookup) {
		console.log(`New:`, item);
	}

	onLeafSelectionChanged(selection:IvLookupSelection) {
		this.lookupMode.set(LookupMode.LeafSearch);
		this.leafSelection.next(selection);
		this.filterItems([])
		console.log(`Selection:`, selection);
	}
}
