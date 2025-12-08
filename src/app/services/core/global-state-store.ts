import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ApiErrorState } from "../api-interfaces";
import { AppDialogStateStore } from "../../components/core/dialogs/app-dialog/services/app-dialog-stateStore";

@Injectable({providedIn: "root"})
export class GlobalStateStore {

    // States
    private m_states = {
        apiErrors: ApiErrorState.default()
    }

    // Services
    private m_appDialogStore:AppDialogStateStore;

    // Subjects
    private m_apiErrorState = new BehaviorSubject<ApiErrorState>(this.m_states.apiErrors);

    // Observables
    public get apiErrorState$() { return this.m_apiErrorState.asObservable(); }

    constructor(appDialogStore:AppDialogStateStore) {
        this.m_appDialogStore = appDialogStore;

        this.serviceInit();
    }

    serviceInit() {
        this.apiErrorState$.subscribe(v => this.m_states.apiErrors = v);
    }

    //===> Actions

    getApiErrorState():ApiErrorState {
        return this.m_states.apiErrors;
    }

    raiseApiFatalError(showDialog:boolean = true) {
        if(!this.m_states.apiErrors.hasErrors) {
            this.m_apiErrorState.next({hasErrors: true, userNotified: showDialog});
            this.m_appDialogStore.showApiFailure();
        }
    }

    resetApiError() {
        this.m_apiErrorState.next(ApiErrorState.default());
    }

    //<===
}