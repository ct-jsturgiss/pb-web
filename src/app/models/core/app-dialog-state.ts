import { AppDialogStateStore } from "../../components/core/dialogs/app-dialog/services/app-dialog-stateStore";

export enum DialogLevel {
    None = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
    Fatal = 4
}

export interface AppDialogQueueEvent {
    current:AppDialogState;
}

export interface AppDialogState {
    visible:boolean;
    dialogLevel:DialogLevel;
    header?:string;
    message?:string;
    onClose:(store?:AppDialogStateStore, state?:AppDialogState) => void;
}

export class AppDialogState implements AppDialogState {

    constructor() {
        this.visible = false;
        this.dialogLevel = DialogLevel.None;
    }

    static default():AppDialogState {
        return new AppDialogState();
    }
}