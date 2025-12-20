import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { ManageIvUnitState } from "../models/manage-iv-unit.state";
import { BehaviorSubject, first, Observer, Subject, takeUntil } from "rxjs";
import { InventoryUnit, InventoryUnitAdapter, InventoryUnitChange } from "../../../../../models/inventory/inventory-unit";
import { ManageMode } from "../../../../core/models/manage-mode.enum";
import { InventoryApiService } from "../../../../../services/inventory/iv-api-service";
import { ApiChangeMethod, ApiRequestResult, ApiRecordChangeRequest } from "../../../../../services/api-interfaces";
import { RecordChangeKind } from "../../../../../models/core/common-types";
import { MessageService } from "primeng/api";

@Injectable()
export class ManageIvUnitService implements OnDestroy {

    // State
    private m_destroy = new Subject<void>();
    private m_state:ManageIvUnitState = new ManageIvUnitState();

    // Subjects
    private m_mode = new BehaviorSubject<ManageMode>(ManageMode.None);
    private m_unit = new BehaviorSubject<string>("");
    private m_unitName = new BehaviorSubject<string>("");
    private m_pluralName = new BehaviorSubject<string|null>("");

    // Observables
    public mode$ = this.m_mode.asObservable();
    public unit$ = this.m_unit.asObservable();
    public unitName$ = this.m_unitName.asObservable();
    public pluralName$ = this.m_pluralName.asObservable();

    // Services
    public api:InventoryApiService;
    public toast:MessageService

    constructor(api:InventoryApiService, toast:MessageService) {
        this.api = api;
        this.toast = toast;
        this.serviceInit();
    }

    serviceInit() {
        this.m_state.unit = InventoryUnit.asNew("","");

        // Subs
        this.m_mode.pipe(takeUntil(this.m_destroy)).subscribe(v => this.m_state.mode = v);
        this.m_unit.pipe(takeUntil(this.m_destroy)).subscribe(v => this.m_state.unit.unit = v);
        this.m_unitName.pipe(takeUntil(this.m_destroy)).subscribe(v => this.m_state.unit.unitName = v);
        this.m_pluralName.pipe(takeUntil(this.m_destroy)).subscribe(v => this.m_state.unit.pluralName = v);
    }

    ngOnDestroy(): void {
        this.m_destroy.next();
    }

    //===> Actions

    loadFromRecord(record:InventoryUnit) {
        this.m_state.unit = {...record};
        this.setUnit(record.unit);
        this.setUnitName(record.unitName);
        this.setPluralName(record.pluralName);
    }

    getAsRecord():InventoryUnit {
        const record = new InventoryUnit(
            this.m_state.unit.id, 
            this.m_state.unit.unit, 
            this.m_state.unit.unitName);

        record.pluralName = this.m_state.unit.pluralName;

        return record;
    }

    reset() {
        this.m_state.unit = InventoryUnit.asNew("","");
        this.setUnit("");
        this.setUnitName("");
        this.setPluralName("");
    }

    getMode() {
        return this.m_state.mode;
    }

    getUnit() {
        return this.m_state.unit.unit;
    }

    getUnitName() {
        return this.m_state.unit.unitName;
    }

    getPluralName() {
        return this.m_state.unit.pluralName;
    }

    setMode(mode:ManageMode) {
        this.m_mode.next(mode);
    }

    setUnit(value:string) {
        this.m_unit.next(value);
    }

    setUnitName(value:string) {
        this.m_unitName.next(value);
    }

    setPluralName(value:string|null){
        this.m_pluralName.next(value);
    }

    isValid():boolean {
        return InventoryUnit.isValid(this.m_state.unit);
    }

    commitRecord(observer:Observer<ApiRequestResult>) { 
        const request = new ApiRecordChangeRequest<InventoryUnitChange>();
        let method:ApiChangeMethod|null = null;
        switch(this.m_state.mode) {
            case ManageMode.Add:
                method = "PUT";
                break;
            case ManageMode.Edit:
                method = "PATCH";
                break;
        }
        if(method) {
            request.setUri(`inventory/units`); // TODO: Moved list of URIs to constants.
            request.records.push(InventoryUnitAdapter.adaptToApi(this.getAsRecord()));
            this.api.pushRecordChanges(method, request).pipe(first()).subscribe(observer);
        } else {
            // TODO: Throw error?
        }
    }

    //<===

}