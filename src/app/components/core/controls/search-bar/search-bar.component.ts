import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

// primeng
import { IconField } from "primeng/iconfield"
import { InputIcon } from "primeng/inputicon"
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'pb-search-bar',
  imports: [IconField, InputIcon, FormsModule, InputTextModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {

  public searchValue = model.required<string>();

}
