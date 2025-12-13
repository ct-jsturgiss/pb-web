import { Component, model, signal, SimpleChanges } from '@angular/core';

// primeng

// pb
import { IvLookupComponent } from "../../../../inventory/iv-lookup/iv-lookup.component";
import { IvLookupService } from '../../../../../services/inventory/iv-lookup-service';
import { SearchBarStateStore } from '../../../../core/controls/search-bar/services/search-bar-store';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'pb-iv-lookup-page',
  imports: [IvLookupComponent, DialogModule],
  templateUrl: './iv-lookup-page.component.html',
  styleUrl: './iv-lookup-page.component.scss',
  providers: [IvLookupService, SearchBarStateStore, DialogService]
})
export class IvLookupPageComponent {

    public service:IvLookupService;

    constructor(service:IvLookupService) {
      this.service = service;
    }
}
