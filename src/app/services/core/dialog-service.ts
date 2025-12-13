import { Injectable, Type } from "@angular/core";

// primeng
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog"
import { AppDialogComponent } from "../../components/core/dialogs/app-dialog/app-dialog.component";

@Injectable()
export class AppDialogService {

    // Services
    public primeService:DialogService;

    constructor(service:DialogService) {
        this.primeService = service;
    }

    showView<TComponent>(componentType:Type<TComponent>, header:string, data?:any):DynamicDialogRef|null {
        return this.primeService.open(componentType, {
            header: header,
            dismissableMask: false,
            closable: false,
            width: '90vw',
            modal: true,
            inputValues: {
                data: data,
            }
        });
    }

    showNotice(header:string, message:string):DynamicDialogRef|null {
        return this.primeService.open(AppDialogComponent, {
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
        return this.primeService.open(AppDialogComponent, {
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