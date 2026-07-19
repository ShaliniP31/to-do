import { Component, inject } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ListService } from '../services/list-service';

@Component({
  selector: 'app-new-list',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './new-list.html',
  styleUrl: './new-list.css',
})
export class NewList {
  faPlus = faPlus
  private listService = inject(ListService);

  listName = ''

  addList() {
    this.listService.addList(this.listName);
    this.listName = '';
  }
}
