import { Component, input, OnInit } from '@angular/core';
import { IvRecord } from '../../../models/inventory/inventory-record';

// primeng
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Button } from "primeng/button";
import { TabsModule } from "primeng/tabs"
import { InventoryLookup } from '../../../models/inventory/inventory-lookup';
import { IftaLabelModule } from "primeng/iftalabel"
import { InputText } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox"
import { InputNumberModule } from "primeng/inputnumber"
import { Select } from "primeng/select";

@Component({
  selector: 'pb-iv-part-view',
  imports: [Button, TabsModule, IftaLabelModule, InputText, CheckboxModule,
    InputNumberModule, Select],
  templateUrl: './iv-part-view.component.html',
  styleUrl: './iv-part-view.component.scss',
})
export class IvPartViewComponent implements OnInit {

  private m_dialogRef:DynamicDialogRef|null;

  // Inputs
  public dialogData = input<any>();

  // Models
  public record:IvRecord|null = null;

  public constructor(dialogRef:DynamicDialogRef|null = null) {
    this.m_dialogRef = dialogRef;
  }

  ngOnInit(): void {
    //this.record = new IvRecord();
  }

  closeDialog() {
    if(this.m_dialogRef) {
      this.m_dialogRef.close();
    } else {
      throw new Error("This view was not created as a dialog.");
    }
  }
}
