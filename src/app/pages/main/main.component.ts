import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DragDropModule,
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  content: Record<string, string[]> = {
    'Tab 1': [],
    'Tab 2': [],
    'Tab 3': [],
  };
  availableItems = ['Item A', 'Item B', 'Item C', 'Item D'];
  activeTab = this.tabs[0];

  onTabChange(index: number) {
    this.activeTab = this.tabs[index];
  }

  drop(event: CdkDragDrop<string[]>) {
    const prev = event.previousContainer;
    const curr = event.container;
    const item = event.item.data as string;

    if (prev === curr) {
      moveItemInArray(curr.data, event.previousIndex, event.currentIndex);
    } else {
      if (prev.id === 'available-list') {
        if (!this.content[this.activeTab].includes(item)) {
          transferArrayItem(
            prev.data,
            this.content[this.activeTab],
            event.previousIndex,
            this.content[this.activeTab].length
          );
        }
      } else {
        transferArrayItem(
          prev.data,
          curr.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }

  removeFromTab(item: string): void {
    const list = this.content[this.activeTab];
    const idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
      this.availableItems.push(item);
    }
  }
}
