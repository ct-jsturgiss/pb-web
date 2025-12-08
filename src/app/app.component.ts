import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from "primeng/button"
import { MainInterfaceComponent } from "./components/core/main-interface/main-interface.component";
import { MainContentComponent } from "./components/app-menu/pages/main-content/main-content.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";
import { AppDialogComponent } from './components/core/dialogs/app-dialog/app-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, MainInterfaceComponent, ToastModule, AppDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
	  MessageService, AppDialogComponent
  ]
})
export class AppComponent {
	title = 'Production Builder';
}
