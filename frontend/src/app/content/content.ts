import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ListCard } from '../list-card/list-card';
import { ListModel } from '../model/list.model';
import { CommonModule } from '@angular/common';
import { ListService } from '../services/list-service';
import { ListPopup } from '../list-popup/list-popup';

@Component({
  selector: 'app-content',
  imports: [ListCard, CommonModule, ListPopup],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {
  private listService = inject(ListService);
  lists = this.listService.lists;

  selectedListId: number = 0;

  openList(selectedListId: number) {
    this.selectedListId = selectedListId;
  }

  closeList() {
    this.selectedListId = 0;
  }
}
