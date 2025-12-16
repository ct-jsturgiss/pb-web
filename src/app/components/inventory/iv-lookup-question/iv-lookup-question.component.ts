import { Component, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';

// primeng
import { SelectModule } from "primeng/select"
import { IvLookupPath } from '../../../models/inventory/lookups/inventory-lookup-path';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'pb-iv-lookup-question',
  imports: [SelectModule, FormsModule, ButtonModule],
  templateUrl: './iv-lookup-question.component.html',
  styleUrl: './iv-lookup-question.component.scss',
})
export class IvLookupQuestionComponent {

  // Inputs
  public leafTitle:InputSignal<string> = input<string>("");
  public leafSource:InputSignal<IvLookupPath[]> = input<IvLookupPath[]>([]);
  public showClearButton:InputSignal<boolean> = input<boolean>(true);

  // Outputs
  public clearButtonClicked:OutputEmitterRef<void> = output<void>();

  // Bindables
  public selectedLeaf:ModelSignal<IvLookupPath|null> = model<IvLookupPath|null>(null);


  // Handlers
  onClearButtonClicked() {
    this.clearButtonClicked.emit();
  }

}
