import { Component, input } from '@angular/core';


@Component({
  selector: 'pb-app-dialog',
  imports: [],
  templateUrl: './app-dialog.component.html',
  styleUrl: './app-dialog.component.scss',
  providers: []
})
export class AppDialogComponent {

  // Input
  public message = input<string>("");

  constructor() { }
}
