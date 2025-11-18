import { Component } from '@angular/core';
import {  MenuModule } from "primeng/menu"
import { PanelModule } from "primeng/panel"
import { DividerModule } from "primeng/divider"
import { TooltipModule } from "primeng/tooltip"
import { DockModule } from "primeng/dock"
import { AppMenuComponent } from "../../app-menu/app-menu.component";

@Component({
  selector: 'app-main-interface',
  imports: [MenuModule, PanelModule, DividerModule, TooltipModule, DockModule, AppMenuComponent],
  templateUrl: './main-interface.component.html',
  styleUrl: './main-interface.component.scss'
})

export class MainInterfaceComponent {

}
