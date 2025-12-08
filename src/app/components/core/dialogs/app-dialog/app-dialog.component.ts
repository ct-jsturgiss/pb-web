import { Component, signal } from '@angular/core';

// primeng
import { DialogModule, Dialog } from "primeng/dialog";
import { AppDialogStateStore } from './services/app-dialog-stateStore';
import { AppDialogState } from '../../../../models/core/app-dialog-state';

@Component({
  selector: 'pb-app-dialog',
  imports: [Dialog],
  templateUrl: './app-dialog.component.html',
  styleUrl: './app-dialog.component.scss',
  providers: [
    DialogModule
  ]
})
export class AppDialogComponent {

  // Store
  public store:AppDialogStateStore;

  // Signals
  public msg = signal<AppDialogState>(AppDialogState.default());

  constructor(stateStore:AppDialogStateStore) {
    this.store = stateStore;
  }

  ngOnInit() {
    this.store.msg$.subscribe(v => this.msg.set(v ?? AppDialogState.default()));
  }



}
