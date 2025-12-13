import { Component } from '@angular/core';
import { IvRecord } from '../../../models/inventory/inventory-record';

@Component({
  selector: 'pb-iv-part-view',
  imports: [],
  templateUrl: './iv-part-view.component.html',
  styleUrl: './iv-part-view.component.scss',
})
export class IvPartViewComponent {

  // Inputs
  public viewData:IvRecord|null = null;

}
