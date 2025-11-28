import { Component, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

// primeng
import { IconField } from "primeng/iconfield"
import { InputIcon } from "primeng/inputicon"
import { InputTextModule } from 'primeng/inputtext';
import { IvLookupComponent } from "../../../../inventory/iv-lookup/iv-lookup.component";

@Component({
  selector: 'pb-iv-lookup-page',
  imports: [IconField, InputIcon, InputTextModule, FormsModule, IvLookupComponent],
  templateUrl: './iv-lookup-page.component.html',
  styleUrl: './iv-lookup-page.component.scss',
})
export class IvLookupPageComponent {

    public searchPattern:ModelSignal<string> = model<string>("");

    constructor() {
    }

}
