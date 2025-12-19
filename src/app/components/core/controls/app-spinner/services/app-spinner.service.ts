import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";

@Injectable({providedIn: "root"})
export class AppSpinnerService implements OnDestroy {

    // State
    private m_state:boolean = false;
    private m_destroy = new Subject<void>();

    // Behaviors
    private m_isVisible = new BehaviorSubject<boolean>(this.m_state);

    // Observables
    public isVisible$ = this.m_isVisible.asObservable();

    constructor() {
        this.m_isVisible.pipe(takeUntil(this.m_destroy)).subscribe(v => this.m_state = v);
    }

    ngOnDestroy(): void {
        this.m_destroy.next();
    }

    //===> Actions

    getIsVisible() {
        this.m_state;
    }

    setIsVisible(toggle:boolean) {
        this.m_isVisible.next(toggle);
    }

    //<===
}