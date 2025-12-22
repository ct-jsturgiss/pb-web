import { AfterContentInit, Component, input, model, ModelSignal, OnDestroy, OnInit, signal } from '@angular/core';

// primeng
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table"
import { SkeletonModule } from "primeng/skeleton"
import { ProgressSpinnerModule } from "primeng/progressspinner"
import { CardModule } from "primeng/card"

// pb
import { InventoryLookup } from '../../../models/inventory/lookups/inventory-lookup';
import { FormsModule } from '@angular/forms';
import { IvLookupQuestionGridComponent } from '../iv-lookup-question-grid/iv-lookup-question-grid.component';
import { IvLookupSelection } from '../../../models/inventory/lookups/inventory-lookup-selection';
import { IvLookupService } from '../../../services/inventory/iv-lookup-service';
import { AsyncPipe } from '@angular/common';
import { SearchBarComponent } from '../../core/controls/search-bar/search-bar.component';
import { SearchBarStateStore } from '../../core/controls/search-bar/services/search-bar-store';
import { LookupMode } from '../../../models/core/lookup-mode';
import { AppConst } from '../../../../constants/ui-constants';
import { Subscription } from 'rxjs';
import { ApiRequestResult, QueryData } from '../../../services/api-interfaces';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiConst } from '../../../../constants/api-constants';
import { DialogModule } from 'primeng/dialog';
import { Button } from "primeng/button";
import { AppDialogService } from '../../../services/core/dialog-service';
import { IvPartViewComponent } from '../iv-part-view/iv-part-view.component';

@Component({
	selector: 'pb-iv-lookup',
	imports: [InputTextModule, TableModule, SkeletonModule, AsyncPipe,
    FormsModule, ProgressSpinnerModule, IvLookupQuestionGridComponent, SearchBarComponent,
    CardModule, DialogModule, Button],
	templateUrl: './iv-lookup.component.html',
	styleUrl: './iv-lookup.component.scss',
	providers: [AppDialogService]
})
export class IvLookupComponent implements OnInit, OnDestroy, AfterContentInit {

	// Refs
	private m_appDialogRef:DynamicDialogRef|null = null;
	private m_partViewDialogRef:DynamicDialogRef|null = null;

	// Subscriptions
	private m_subs:Subscription = new Subscription();

	// Constants
	public get cEmptyValue() { return AppConst.placeholders.emptyValue; }

	// Services
	public store = input.required<IvLookupService>();
	public dialogService:AppDialogService;

	// Props
	public get searchStore():SearchBarStateStore { return this.store().searchStore; }

	// Bindables
	public isQuerying:ModelSignal<boolean> = model<boolean>(false);
	public isLoading:ModelSignal<boolean> = model<boolean>(false);
	public get lookupView$() { return this.store().lookupView$; }
	public get selectedLookup$() { return this.store().selected$; }

	// Signals
	public selectedLookup = signal<InventoryLookup|null>(null);

	constructor(dialogService:AppDialogService) {
		this.dialogService = dialogService;
	}

	ngOnInit(): void {
		console.log("Init");
		this.m_subs.add(this.searchStore.searchText$.subscribe(v => this.onSearchPatternChanged(v)));
		this.m_subs.add(this.store().selected$.subscribe(v => this.onSelectedChanged(v)));
		this.m_subs.add(this.store().leafSelection$.subscribe(v => this.onLeafSelectionChanged(v)));

		this.isLoading.set(true);
		this.isQuerying.set(true);
	}

	ngAfterContentInit(): void {
		this.store().refreshLookups({
			next: v => this.onLookupsRefresh(v),
			error: v => this.onLookupsRefreshError(v),
			complete: () => this.onLookupsRefreshComplete()
		});
	}

	ngOnDestroy(): void {
		this.m_subs.unsubscribe();
	}

	// Observable Handlers
	onLookupsRefresh(data:QueryData<InventoryLookup>) {
		this.store().setStore(data.records);
		this.store().filterItems();
	}

	onLookupsRefreshError(error:ApiRequestResult) {
		this.selectedLookup.set(null);
		if(error.stateCode?.code === ApiConst.localErrorCodes.serverUnreachable.code) {
			this.m_appDialogRef = this.dialogService.showApiUnavailable();
		} else {
			console.error(error); // TODO: Other errors?
		}
		
		this.isQuerying.set(false);
		this.isLoading.set(false);
	}

	onLookupsRefreshComplete() {
		this.selectedLookup.set(null);
		this.isQuerying.set(false);
		this.isLoading.set(false);
		this.store().refreshLeafCache();
	}

	// Handlers

	onViewLookupClicked() {
		const selected = this.selectedLookup();
		if(selected) {
			this.m_partViewDialogRef = this.dialogService.showView(IvPartViewComponent, "Part Viewer", {
				lookupSeed: selected
			});
		}
	}

	onSearchPatternChanged(value:string) {
		this.store().setMode(LookupMode.SearchPattern);
		this.store().filterItems();
	}

	onSelectedChanged(item:InventoryLookup|null) {
		this.selectedLookup.set(item);
	}

	onLeafSelectionChanged(selection:IvLookupSelection|null) {
		this.selectedLookup.set(null);
		this.store().setMode(LookupMode.LeafSearch);
		this.store().filterItems();
	}
}
