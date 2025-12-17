import { Injectable, OnDestroy } from "@angular/core";
import { InventoryUnit } from "../../models/inventory/inventory-unit";
import { BehaviorSubject, first, Observer, Subject, takeUntil } from "rxjs";
import { InventoryApiService } from "./iv-api-service";
import { ApiQueryRequest, QueryData } from "../api-interfaces";

export interface IvUnitViewState {
    units:InventoryUnit[];
}

@Injectable()
export class IvUnitsService implements OnDestroy {

    // State
    private m_destroyed = new Subject<void>();
    private m_state:IvUnitViewState = {units: []};

    // Subjects
    private m_unitStore = new BehaviorSubject<InventoryUnit[]>([]);

    // Observables
    public unitStore$ = this.m_unitStore.asObservable();

    public api:InventoryApiService;

    constructor(api:InventoryApiService) {
        this.api = api;

        this.serviceInit();
    }

    ngOnDestroy(): void {
        this.m_destroyed.next();
    }

    serviceInit() {
        this.unitStore$.pipe(takeUntil(this.m_destroyed)).subscribe(v => this.m_state.units = v);
    }
    
    //===> State Updates

    setUnitStore(units:InventoryUnit[]) {
        this.m_unitStore.next(units);
    }

    //<===

    //===> Actions

    refreshUnits(observer:Observer<QueryData<InventoryUnit>>) {
        this.api.listInventoryUnits(this.getUnitsRequest())
            .pipe(first())
            .subscribe(observer);
    }

    //<===


    //===> Queries

    getUnitsRequest():ApiQueryRequest {
        return new ApiQueryRequest()
            .setUri(`inventory/units`);
    }

    //<===
}