import { Component, input, OnInit, signal } from '@angular/core';

// primeng
import { ToolbarModule } from "primeng/toolbar"
import { Button } from "primeng/button";
import { TableModule } from "primeng/table"
import { IvUnitsService } from '../../../services/inventory/iv-units-service';
import { AsyncPipe } from '@angular/common';
import { ApiRequestResult, QueryData } from '../../../services/api-interfaces';
import { InventoryUnit } from '../../../models/inventory/inventory-unit';
import { ProgressSpinner } from "primeng/progressspinner";
import { ApiConst } from '../../../../constants/api-constants';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppDialogService } from '../../../services/core/dialog-service';
import { ManageIvUnitDialogComponent } from '../../dialogs/inventory/manage-iv-unit-dialog/manage-iv-unit-dialog.component';
import { ManageIvUnitService } from '../../dialogs/inventory/manage-iv-unit-dialog/services/manage-iv-unit-service';
import { ManageMode } from '../../core/models/manage-mode.enum';

@Component({
  selector: 'pb-iv-units-view',
  imports: [ToolbarModule, Button, TableModule, AsyncPipe, ProgressSpinner, ManageIvUnitDialogComponent],
  templateUrl: './iv-units-view.component.html',
  styleUrl: './iv-units-view.component.scss',
  providers: [AppDialogService, ManageIvUnitService]
})
export class IvUnitsViewComponent implements OnInit {

  private m_appDialogRef:DynamicDialogRef|null = null;

  // Signals
  public isLoading = signal<boolean>(false);
  public isManageDialogVisible = signal<boolean>(false);

  // Services
  public service = input.required<IvUnitsService>();
  public dialogService:AppDialogService;
  public manageService:ManageIvUnitService;

  constructor(dialogService:AppDialogService, manageService:ManageIvUnitService) {
    this.dialogService = dialogService;
    this.manageService = manageService;
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    this.refreshUnits();
  }

  // Functions
  refreshUnits() {
    this.service().refreshUnits({
      next: (v) => this.onUnitsRefresh(v),
      error: (v) => this.onUnitsRefreshError(v),
      complete: () => this.onUnitsRefreshComplete()
    });
  }

  // Observers
  onUnitsRefresh(data:QueryData<InventoryUnit>) {
    this.service().setUnitStore(data.records);
  }

  onUnitsRefreshError(error:ApiRequestResult) {
    if(error.stateCode?.code === ApiConst.localErrorCodes.serverUnreachable.code) {
      this.m_appDialogRef = this.dialogService.showApiUnavailable();
    } else {
      console.error(error); // TODO: Other errors?
    }
    this.isLoading.set(false);
  }

  onUnitsRefreshComplete() {
    this.isLoading.set(false);
  }

  // Handlers

  onButtonNewClicked() {
    this.manageService.setMode(ManageMode.Add);
    this.isManageDialogVisible.set(true);
  }

  onManageDialogClosed() {
    this.refreshUnits();
  }

}
