import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

// primeng
import { IconField } from "primeng/iconfield"
import { InputIcon } from "primeng/inputicon"
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from "primeng/button";
import { Tooltip, TooltipModule } from "primeng/tooltip";
import { SearchBarStateStore } from './services/search-bar-store';

@Component({
  selector: 'pb-search-bar',
  imports: [IconField, InputIcon, FormsModule, InputTextModule, ButtonModule, TooltipModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {

  // Inputs
  public store = input.required<SearchBarStateStore>();

  // Binding
  public searchValue = model<string>("");

  ngOnInit() {
    this.searchValue.subscribe(v => this.store().setSearchText(v));
  }

  // Handlers
  onClearButtonClicked() {
    this.searchValue.set("");
  }

}
