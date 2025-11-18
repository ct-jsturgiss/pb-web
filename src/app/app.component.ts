import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from "primeng/button"
import { MainInterfaceComponent } from "./components/core/main-interface/main-interface.component";
import { MainContentComponent } from "./components/main-content/main-content.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, MainInterfaceComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
	MessageService
  ]
})
export class AppComponent {
	title = 'Production Builder';
}
