import { Component, model, ModelSignal } from '@angular/core';

// primeng

// pb
import { IvLookupComponent } from "../../../../inventory/iv-lookup/iv-lookup.component";
import { SearchBarComponent } from "../../../../core/controls/search-bar/search-bar.component";
import { IvLookupQuestionGridComponent } from "../../../../inventory/iv-lookup-question-grid/iv-lookup-question-grid.component";

@Component({
  selector: 'pb-iv-lookup-page',
  imports: [IvLookupComponent, SearchBarComponent, IvLookupQuestionGridComponent],
  templateUrl: './iv-lookup-page.component.html',
  styleUrl: './iv-lookup-page.component.scss',
})
export class IvLookupPageComponent {

    public searchPattern:ModelSignal<string> = model<string>("");

}
