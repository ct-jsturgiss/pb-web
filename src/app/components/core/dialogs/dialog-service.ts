import { Injectable } from "@angular/core";

// primeng
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog"
import { AppDialogComponent } from "./app-dialog/app-dialog.component";

@Injectable()
export class AppDialogService {

    // Services
    public service:DialogService;

    constructor(service:DialogService) {
        this.service = service;
    }

    showNotice(header:string, message:string):DynamicDialogRef|null {
        return this.service.open(AppDialogComponent, {
            header: header,
            dismissableMask: true,
            closable: true,
            width: '50vw',
            modal: true,
            inputValues: {
                message: message
            }
        });
    }

    showApiUnavailable():DynamicDialogRef|null {
        return this.service.open(AppDialogComponent, {
            header: "API Unavailable",
            dismissableMask: true,
            closable: true,
            width: '50vw',
            modal: true,
            inputValues: {
                message: "Failed to establish connectivity to the Production Builder API."
            }
        });
    }

}