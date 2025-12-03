import { Component, model, signal, SimpleChanges } from '@angular/core';

// primeng

// pb
import { IvLookupComponent } from "../../../../inventory/iv-lookup/iv-lookup.component";
import { SearchBarComponent } from "../../../../core/controls/search-bar/search-bar.component";
import { IvLookupService } from '../../../../../services/inventory/iv-lookup-service';
import { IvLookupState } from '../../../../../models/inventory/inventory-lookup-state';
import { LookupMode } from '../../../../../models/core/lookup-mode';
import { SearchBarStateStore } from '../../../../core/controls/search-bar/services/search-bar-store';

@Component({
  selector: 'pb-iv-lookup-page',
  imports: [IvLookupComponent],
  templateUrl: './iv-lookup-page.component.html',
  styleUrl: './iv-lookup-page.component.scss',
  providers: [IvLookupService, SearchBarStateStore]
})
export class IvLookupPageComponent {

    public service:IvLookupService;

    constructor(service:IvLookupService) {
      this.service = service;
    }
}
