import { Component, input, InputSignal } from '@angular/core';

// primeng
import { SelectModule } from "primeng/select"

@Component({
  selector: 'pb-iv-lookup-question',
  imports: [SelectModule],
  templateUrl: './iv-lookup-question.component.html',
  styleUrl: './iv-lookup-question.component.scss',
})
export class IvLookupQuestionComponent {

  public questionTitle:InputSignal<string> = input<string>("");

}
