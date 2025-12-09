import { Injectable } from "@angular/core";
import { AppDialogQueueEvent, AppDialogState, DialogLevel } from "../../../../../models/core/app-dialog-state";
import { BehaviorSubject, concat, Observable, of, Subject, switchMap } from "rxjs";

@Injectable({providedIn: "root"})
export class AppDialogStateStore {

    // Internal State
    private m_state:AppDialogState|null = null;
    private m_queue:AppDialogState[] = [];
    private m_pending:AppDialogState[] = [];

    // Subjects
    private m_msgQueue:BehaviorSubject<AppDialogState[]> = new BehaviorSubject<AppDialogState[]>([]);
    private m_msg:BehaviorSubject<AppDialogState|null> = new BehaviorSubject<AppDialogState|null>(null);
    private m_msgClosed:Subject<AppDialogQueueEvent> = new Subject<AppDialogQueueEvent>();

    // Observables
    public msgQueue$:Observable<AppDialogState[]> = this.m_msgQueue.asObservable();
    public msg$:Observable<AppDialogState|null> = this.m_msg.asObservable();
    public msgClosed$:Observable<AppDialogQueueEvent> = this.m_msgClosed.asObservable();

    constructor() {
        this.serviceInit();
    }

    // Init
    serviceInit() {
        this.msgQueue$.subscribe(v => this.m_queue = v);
        this.msg$.subscribe(v => this.m_state = v);
        this.m_msgClosed.subscribe(v => {
            const next = this.m_queue.pop(); // Get next.
            this.m_msgQueue.next(this.m_queue); // 
            if(next) {
                this.m_msg.next({
                    ...next,
                    visible: true
                } as AppDialogState);
            } else {
                this.m_msg.next(null);
            }
        });
    }

    // State
    hasQueued() {
        return this.m_pending.length > 0;
    }

    // Actions

    enqueue(dialog:AppDialogState) {
        this.m_msgQueue.next([dialog, ...this.m_queue]);
        this.m_pending.push(dialog);
    }

    next() {
        let thisMsg = this.m_pending.shift();
        if(thisMsg) {
            const closeHandler = thisMsg.onClose ?? (() => {});
            thisMsg.onClose = () => {
                closeHandler(this, thisMsg);
                this.m_msgClosed.next({current: thisMsg!});
            };
            thisMsg = {
                ...thisMsg,
                visible: true
            };
            this.msgClosed$ = concat(this.msgClosed$, of({current: thisMsg!} as AppDialogQueueEvent));
            if(!this.m_state) {
                this.m_queue.pop();
                this.m_msg.next(thisMsg);
            }
        }
    }

    showApiFailure() { 
        this.enqueue({
            dialogLevel: DialogLevel.Fatal,
            header: "API Failure",
            message: "Failed to retrieve lookups due to a network or communication failure to the API."
        } as AppDialogState);
        this.next();
    }
}