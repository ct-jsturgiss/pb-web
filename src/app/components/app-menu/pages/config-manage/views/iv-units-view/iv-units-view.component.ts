import { Component } from '@angular/core';

// primeng
import { ToolbarModule } from "primeng/toolbar"
import { Button } from "primeng/button";
import { TableModule } from "primeng/table"
import { Card } from "primeng/card";

@Component({
  selector: 'pb-iv-units-view',
  imports: [ToolbarModule, Button, TableModule, Card],
  templateUrl: './iv-units-view.component.html',
  styleUrl: './iv-units-view.component.scss',
})
export class IvUnitsViewComponent {

}
