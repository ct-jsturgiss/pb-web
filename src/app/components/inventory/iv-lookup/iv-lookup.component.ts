import { Component, input, model, ModelSignal, signal } from '@angular/core';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table"
import { SkeletonModule } from "primeng/skeleton"
import { ProgressSpinnerModule } from "primeng/progressspinner"
import { CardModule } from "primeng/card"

// pb
import { InventoryLookup } from '../../../models/inventory/inventory-lookup';
import { FormsModule } from '@angular/forms';
import { IvLookupQuestionGridComponent } from '../iv-lookup-question-grid/iv-lookup-question-grid.component';
import { IvLookupSelection } from '../../../models/inventory/inventory-lookup-selection';
import { IvLookupService } from '../../../services/inventory/iv-lookup-service';
import { AsyncPipe } from '@angular/common';
import { SearchBarComponent } from '../../core/controls/search-bar/search-bar.component';
import { SearchBarStateStore } from '../../core/controls/search-bar/services/search-bar-store';
import { LookupMode } from '../../../models/core/lookup-mode';
import { AppConst } from '../../../../constants/ui-constants';

@Component({
	selector: 'pb-iv-lookup',
	imports: [InputTextModule, TableModule, SkeletonModule, AsyncPipe,
		FormsModule, ProgressSpinnerModule, IvLookupQuestionGridComponent, SearchBarComponent,
		CardModule
	],
	templateUrl: './iv-lookup.component.html',
	styleUrl: './iv-lookup.component.scss',
})
export class IvLookupComponent {

	// Constants
	public get cEmptyValue() { return AppConst.placeholders.emptyValue; }

	// Services
	public store = input.required<IvLookupService>();

	// Props
	public get searchStore():SearchBarStateStore { return this.store().searchStore; }

	// Bindables
	public isQuerying:ModelSignal<boolean> = model<boolean>(false);
	public isLoading:ModelSignal<boolean> = model<boolean>(false);
	public get lookupView$() { return this.store().lookupView$; }
	public get selectedLookup$() { return this.store().selected$; }

	// Signals
	public selectedLookup = signal<InventoryLookup|null>(null);

	constructor() {
	}

	ngOnInit() {
		console.log("Init");
		this.searchStore.searchText$.subscribe(v => this.onSearchPatternChanged(v));
		this.store().selected$.subscribe(v => this.onSelectedChanged(v));
		this.store().leafSelection$.subscribe(v => this.onLeafSelectionChanged(v));

		this.isQuerying.set(true);
		this.store().refreshLookups(() => {
			this.isQuerying.set(false);
			console.log("Initial refresh done");
		});
	}

	// Handlers

	onSearchPatternChanged(value:string) {
		this.store().setMode(LookupMode.SearchPattern);
		this.store().filterItems();
	}

	onSelectedChanged(item:InventoryLookup|null) {
		this.selectedLookup.set(item);
	}

	onLeafSelectionChanged(selection:IvLookupSelection|null) {
		this.store().setMode(LookupMode.LeafSearch);
		this.store().filterItems();
	}
}
