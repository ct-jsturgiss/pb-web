import { Component, input, OnInit, signal } from '@angular/core';

// primeng
import { ToolbarModule } from "primeng/toolbar"
import { Button } from "primeng/button";
import { TableModule } from "primeng/table"
import { IvUnitsService } from '../../../services/inventory/iv-units-service';
import { AsyncPipe } from '@angular/common';
import { ApiQueryResult, QueryData } from '../../../services/api-interfaces';
import { InventoryUnit } from '../../../models/inventory/inventory-unit';
import { ProgressSpinner } from "primeng/progressspinner";
import { ApiConst } from '../../../../constants/api-constants';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppDialogService } from '../../../services/core/dialog-service';

@Component({
  selector: 'pb-iv-units-view',
  imports: [ToolbarModule, Button, TableModule, AsyncPipe, ProgressSpinner],
  templateUrl: './iv-units-view.component.html',
  styleUrl: './iv-units-view.component.scss',
  providers: [AppDialogService]
})
export class IvUnitsViewComponent implements OnInit {

  private m_appDialogRef:DynamicDialogRef|null = null;

  // Signals
  public isLoading = signal<boolean>(false);

  // Store
  public service = input.required<IvUnitsService>();
  public dialogService:AppDialogService;

  constructor(dialogService:AppDialogService) {
    this.dialogService = dialogService;
  }

  ngOnInit(): void {
    this.isLoading.set(true);
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

  onUnitsRefreshError(error:ApiQueryResult) {
    if(error.stateCode?.code === ApiConst.errorCodes.serverUnreachable.code) {
      this.m_appDialogRef = this.dialogService.showApiUnavailable();
    } else {
      console.error(error); // TODO: Other errors?
    }
    this.isLoading.set(false);
  }

  onUnitsRefreshComplete() {
    this.isLoading.set(false);
  }

}
