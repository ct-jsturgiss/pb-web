import { Component, OnInit, signal, Type } from '@angular/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { IvUnitsViewComponent } from '../../views/iv-units-view/iv-units-view.component';

// primeng
import { PanelMenuModule } from "primeng/panelmenu"
import { ConfigManageMenu, ConfigManageMenuItems } from '../../../../constants/ui-constants';
import { IvUnitsService } from '../../../services/inventory/iv-units-service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'pb-config-manage',
  imports: [PanelMenuModule, IvUnitsViewComponent],
  templateUrl: './config-manage.component.html',
  styleUrl: './config-manage.component.scss',
  providers: [IvUnitsService, DialogService]
})
export class ConfigManageComponent implements OnInit {

  public menuItems:MenuItem[] = [];

  // Const
  public menu = ConfigManageMenu;

  // Signals
  public selectedMenuItem = signal<MenuItem|null>(null);

  constructor(
    public ivUnitsService:IvUnitsService
  ) {

  }

  ngOnInit(): void {
    this.menuItems = this.buildMenuItems();
  }

  buildMenuItems():MenuItem[] {
    const assignCmd = (item:MenuItem):MenuItem => {
      if(item.items && item.items.length > 0) {
        return {...item, items: item.items.map(i => assignCmd(i))};
      } else {
        return {...item,
          command: (e) => this.onMenuItemSelected(e)
        }
      }
    };
    
    return ConfigManageMenuItems.map(m => assignCmd(m));
  }

  // Handlers
  onMenuItemSelected(event:MenuItemCommandEvent) {
    this.selectedMenuItem.set(event.item as MenuItem);
  }

}
