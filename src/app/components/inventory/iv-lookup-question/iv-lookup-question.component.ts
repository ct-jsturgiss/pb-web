import { Component, input, InputSignal, model, ModelSignal, output, OutputEmitterRef, SimpleChanges } from '@angular/core';

// primeng
import { SelectModule } from "primeng/select"
import { IvLookupPath } from '../../../models/inventory/inventory-lookup-path';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pb-iv-lookup-question',
  imports: [SelectModule, FormsModule],
  templateUrl: './iv-lookup-question.component.html',
  styleUrl: './iv-lookup-question.component.scss',
})
export class IvLookupQuestionComponent {

  public leafTitle:InputSignal<string> = input<string>("");
  public leafSource:InputSignal<IvLookupPath[]> = input<IvLookupPath[]>([]);
  public selectedLeaf:ModelSignal<IvLookupPath|null> = model<IvLookupPath|null>(null);

}
