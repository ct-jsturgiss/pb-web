import { Component } from '@angular/core';
import { AppDialogStateStore } from '../../../core/dialogs/app-dialog/services/app-dialog-stateStore';
import { AppDialogState, DialogLevel } from '../../../../models/core/app-dialog-state';
import { Button } from "primeng/button";

@Component({
  selector: 'app-main-content',
  imports: [],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {

  private appDialog:AppDialogStateStore;

  constructor(appDialog:AppDialogStateStore) {
    this.appDialog = appDialog;
  }

  // testClick() {
  //   for(let i = 0; i < 5; i++) {
  //     this.appDialog.enqueue({
  //       dialogLevel: DialogLevel.Info,
  //       header: "Test App Dialog - " + i.toString(),
  //       message: "Hi, I am a test app dialog."
  //     } as AppDialogState);
  //   }
  //   while(this.appDialog.hasQueued()) {
  //     this.appDialog.next();
  //   }
  // }

}
