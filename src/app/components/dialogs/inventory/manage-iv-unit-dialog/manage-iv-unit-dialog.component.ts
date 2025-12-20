import { Component, input, model } from '@angular/core';
import { ManageIvUnitService } from './services/manage-iv-unit-service';
import { ManageMode } from '../../../core/models/manage-mode.enum';

// primeng
import { DialogModule } from 'primeng/dialog';
import { IftaLabel } from "primeng/iftalabel";
import { InputText } from "primeng/inputtext";
import { Button } from "primeng/button";
import { MessageModule } from "primeng/message"
import { AsyncPipe } from '@angular/common';
import { AppSpinnerService } from '../../../core/controls/app-spinner/services/app-spinner.service';
import { ApiRequestResult } from '../../../../services/api-interfaces';

@Component({
  selector: 'pb-manage-iv-unit-dialog',
  imports: [DialogModule, IftaLabel, InputText, Button, MessageModule,
    AsyncPipe],
  templateUrl: './manage-iv-unit-dialog.component.html',
  styleUrl: './manage-iv-unit-dialog.component.scss',
  providers: []
})
export class ManageIvUnitDialogComponent {

  // Service
  public service = input.required<ManageIvUnitService>();
  public appSpinner:AppSpinnerService;

  // Inputs
  public isVisible = model<boolean>(false);

  constructor(appSpinnerService:AppSpinnerService) {
    this.appSpinner = appSpinnerService;
  }

  getDialogName() {
    const mode = this.service().getMode();
    switch(mode) {
      case ManageMode.View:
        return `View Unit Of Measure`;
      case ManageMode.Add:
        return `Add Unit Of Measure`;
      case ManageMode.Edit:
        return `Edit Unit Of Measure`;
      default:
        return `Invalid Mode`;
    }
  }

  // Handlers

  onUnitChanged(event:Event) {
    const value = (event.target as HTMLInputElement).value;
    this.service().setUnit(value);
  }

  onUnitNameChanged(event:Event) {
    const value = (event.target as HTMLInputElement).value;
    this.service().setUnitName(value);
  }

  onPluralNameChanged(event:Event) {
    const value = (event.target as HTMLInputElement).value;
    this.service().setPluralName(value);
  }

  onButtonSaveClicked() {
    if(!this.service().isValid()){
      this.service().toast.add({
        severity: "error",
        summary: "Unit Of Measure",
        detail: "Required fields are not populated.",
        life: 5000
      });
    } else {
      this.appSpinner.setIsVisible(true);
      this.service().commitRecord({
        next: v => this.onCommitFinished(v),
        error: v => this.onCommitError(v),
        complete: () => this.onCommitCompleted()
      });
    }
  }

  onButtonCancelClicked() {
    this.isVisible.set(false);
  }

  onDialogClose() {
    this.service().setMode(ManageMode.None);
    this.service().reset();
  }

  // Observer Handlers

  onCommitFinished(result:ApiRequestResult) {
    this.appSpinner.setIsVisible(false);
  }

  onCommitError(result:ApiRequestResult) {
    console.error(`Commit errors: `, result.errors);
    this.appSpinner.setIsVisible(false);
    const firstError = result.errors?.at(0);
    this.toastCommitFailed(firstError?.errorMessage || "Unknown error");
  }

  onCommitCompleted() { 
    this.toastCommitSuccess();
  }


  toastCommitSuccess() {
    this.service().toast.add({
      severity: "success",
      summary: "Unit Of Measure",
      detail: `Successfully added '${this.service().getUnitName()}'`
    });
  }

  toastCommitFailed(reason:string) {
    this.service().toast.add({
      severity: "error",
      summary: "Unit Of Measure",
      detail: `Failed to add '${this.service().getUnitName()}': ${reason}`
    });
  }

}
