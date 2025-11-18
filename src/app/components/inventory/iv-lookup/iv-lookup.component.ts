import { Component } from '@angular/core';

// primeng
import { IconField } from "primeng/iconfield"
import { InputIcon } from "primeng/inputicon"
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table"

@Component({
  selector: 'pb-iv-lookup',
  imports: [IconField, InputIcon, InputTextModule, TableModule],
  templateUrl: './iv-lookup.component.html',
  styleUrl: './iv-lookup.component.scss'
})
export class IvLookupComponent {

}
