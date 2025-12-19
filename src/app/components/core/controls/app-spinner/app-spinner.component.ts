import { Component, input, model } from '@angular/core';

// primeng
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from "primeng/blockui"

@Component({
  selector: 'pb-app-spinner',
  imports: [ProgressSpinnerModule, BlockUIModule],
  templateUrl: './app-spinner.component.html',
  styleUrl: './app-spinner.component.scss',
})
export class AppSpinnerComponent {

  public isVisible = model<boolean>(false);

}
