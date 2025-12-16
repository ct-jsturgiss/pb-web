import { Component, OnInit, signal, Type } from '@angular/core';
import { MenuItem, MenuItemCommandEvent } from 'primeng/api';

// primeng
import { PanelMenuModule } from "primeng/panelmenu"
import { ConfigManageMenu, ConfigManageMenuItems } from '../../../../../constants/ui-constants';
import { NgComponentOutlet } from '@angular/common';
import { IvUnitsViewComponent } from './views/iv-units-view/iv-units-view.component';

@Component({
  selector: 'pb-config-manage',
  imports: [PanelMenuModule, NgComponentOutlet],
  templateUrl: './config-manage.component.html',
  styleUrl: './config-manage.component.scss',
})
export class ConfigManageComponent implements OnInit {

  public menuItems:MenuItem[] = [];

  // Signals
  public selectedMenuItem = signal<MenuItem|null>(null);

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

  getContent():Type<Component> {
    const item = this.selectedMenuItem();
    if(item) {
      switch(item?.id) {
        case ConfigManageMenu.inventory.ivunits:
          return IvUnitsViewComponent;
        default:
          return null!;
      }
    } else {
      return null!;
    }
  }

  // Handlers
  onMenuItemSelected(event:MenuItemCommandEvent) {
    this.selectedMenuItem.set(event.item as MenuItem);
  }

}
