import { Component, input, model, output } from '@angular/core';
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
import { InventoryUnit } from '../../../../models/inventory/inventory-unit';
import { ApiConst } from '../../../../../constants/api-constants';

@Component({
  selector: 'pb-manage-iv-unit-dialog',
  imports: [DialogModule, IftaLabel, InputText, Button, MessageModule,
    AsyncPipe],
  templateUrl: './manage-iv-unit-dialog.component.html',
  styleUrl: './manage-iv-unit-dialog.component.scss',
  providers: []
})
export class ManageIvUnitDialogComponent {

  // State
  private m_record:InventoryUnit|null = null;

  // Service
  public service = input.required<ManageIvUnitService>();
  public appSpinner:AppSpinnerService;

  // Inputs
  public isVisible = model<boolean>(false);

  // Outputs
  public dialogClosed = output<void>();

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
      this.m_record = this.service().getAsRecord();
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
    this.toastCommitFailed(ApiConst.helpers.getToastMessage(result));
  }

  onCommitCompleted() { 
    this.toastCommitSuccess();
    this.isVisible.set(false);
    this.dialogClosed.emit();
  }


  toastCommitSuccess() {
    this.service().toast.add({
      severity: "success",
      summary: "Unit Of Measure",
      detail: `Successfully added '${this.m_record?.unitName}'`,
      life: 5000
    });
  }

  toastCommitFailed(reason:string) {
    this.service().toast.add({
      severity: "error",
      summary: "Unit Of Measure",
      detail: `Failed to add '${this.m_record?.unitName}': ${reason}`,
      life: 5000
    });
  }

}
