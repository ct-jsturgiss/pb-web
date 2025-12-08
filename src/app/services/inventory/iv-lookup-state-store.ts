import { Injectable } from "@angular/core";
import { BehaviorSubject, first, Observable } from "rxjs";
import { InventoryLookup } from "../../models/inventory/inventory-lookup";
import { LookupMode } from "../../models/core/lookup-mode";
import { InventoryApiService } from "./iv-api-service";
import { ApiQueryRequest, QueryData } from "../api-interfaces";
import { containsAsString } from "../core/helpers";
import { IvLookupSelection } from "../../models/inventory/inventory-lookup-selection";
import { SearchBarStateStore } from "../../components/core/controls/search-bar/services/search-bar-store";
import { IvLookupState } from "../../models/inventory/inventory-lookup-state";
import { EmptyLambda, EmptyLambdaType } from "../../models/core/common-types";
import { AppDialogStateStore } from "../../components/core/dialogs/app-dialog/services/app-dialog-stateStore";

@Injectable()
export class IvLookupStateStore {

    // Internal State
    private m_state:IvLookupState = IvLookupState.default();

    // Observables
    private m_lookupStore = new BehaviorSubject<InventoryLookup[]>(this.m_state.lookupStore);
    private m_lookupView = new BehaviorSubject<InventoryLookup[]>(this.m_state.lookupView);
    private m_selected = new BehaviorSubject<InventoryLookup|null>(this.m_state.selected);
    private m_mode = new BehaviorSubject<LookupMode>(this.m_state.mode);
    private m_leafSelection = new BehaviorSubject<IvLookupSelection|null>(this.m_state.leafSelection);

    // Services
    public searchStore:SearchBarStateStore;
    public appDialogStore:AppDialogStateStore;

    public apiError:boolean = false;
    public lookupStore$:Observable<InventoryLookup[]> = this.m_lookupStore.asObservable();
    public lookupView$:Observable<InventoryLookup[]> = this.m_lookupView.asObservable();
    public selected$:Observable<InventoryLookup|null> = this.m_selected.asObservable();
    public mode$:Observable<LookupMode> = this.m_mode.asObservable();
    public leafSelection$:Observable<IvLookupSelection|null> = this.m_leafSelection.asObservable();
    //public searchPattern:Observable<string> = this.m_searchPattern.asObservable();

    public api:InventoryApiService;

    constructor(api:InventoryApiService, searchStore:SearchBarStateStore, appDialog:AppDialogStateStore) {
        this.api = api;
        this.searchStore = searchStore;
        this.appDialogStore = appDialog;

        this.serviceInit();
    }
    
    serviceInit() {
        // Lookups
        this.lookupStore$.subscribe(v => this.m_state.lookupStore = v);
        this.lookupView$.subscribe(v => this.m_state.lookupView = v);
        this.selected$.subscribe(v => this.m_state.selected = v);
        this.mode$.subscribe(v => this.m_state.mode = v);
        this.leafSelection$.subscribe(v => this.m_state.leafSelection = v);

        // Search Store
        this.searchStore.searchText$.subscribe(v => this.m_state.searchPattern = v);
    }

    //===> State Updates

    setStore(records:InventoryLookup[]) {
        this.m_lookupStore.next(records);
    }

    setView(records:InventoryLookup[]) {
        this.m_lookupView.next(records);
    }

    setSelectedLookup(selected:InventoryLookup|null) {
        this.m_selected.next(selected);
    }

    setMode(mode:LookupMode) {
        this.m_mode.next(mode);
    }

    setLeafSelection(selection:IvLookupSelection|null) {
        this.m_leafSelection.next(selection);
    }

    //<===

    //===> Actions

	filterItems() {
        const items = this.m_state.lookupStore;
		if(this.m_mode.value === LookupMode.SearchPattern) {
			const searchStr = this.m_state.searchPattern ?? "";
			if(!searchStr) {
                this.setView(items);
			} else {
				let filteredItems:InventoryLookup[] = items;
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

                this.setView(filteredItems);
			}
		} else {
			const targetPath:string = this.m_state.leafSelection?.selectionPath ?? "";
			const filteredItems = items.filter(l => (l.pathId ?? "").startsWith(targetPath));
            this.setView(filteredItems);
		}
	}

    //<===

    //===> Dialogs
    //<===
    
	//===> Queries
    
    refreshLookups(after:EmptyLambdaType = EmptyLambda) {

        this.api.listInventoryLookups(this.getLookupsRequest())
            .pipe(first())
            .subscribe(v => this.handleRefreshLookups(v, after));
            
    }

    handleRefreshLookups(value:QueryData<InventoryLookup>, after:EmptyLambdaType = EmptyLambda) {
        if(value.response.isFatal || value.response.isError) {
            // this.setStore([]);
            // this.filterItems();
            this.apiError = true;
            this.appDialogStore.showApiFailure();
        } else {
            this.apiError = false;
            this.setStore(value.records);
            this.filterItems();
        }
        after();
    }

	getLookupsRequest():ApiQueryRequest {
		return new ApiQueryRequest()
			.setUri(`inventory/items`);
	}

    //<===
}