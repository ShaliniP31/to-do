import { Component, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark, faFilter, faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListService } from '../services/list-service';

@Component({
  selector: 'app-list-popup',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './list-popup.html',
  styleUrl: './list-popup.css',
})

export class ListPopup {
  faXmark = faXmark;
  faBars = faBars;
  faFilter = faFilter;
  faCheck = faCheck;
  faPenToSquare = faPenToSquare;

  private listService = inject(ListService);

  taskName = '';
  showNewTaskRow = false;
  showMenu = false;
  showFilter = false;

  @Input() selectedListId!: number;
  selectedList = computed(() =>
    this.listService.lists().find(
      list => list.id === this.selectedListId!
    )
  );

  @Output() close = new EventEmitter<void>();
  closeList() {
    this.close.emit();
  }

  addTaskRow() {
    this.showNewTaskRow = true;
  }

  clearTask() {
    this.showNewTaskRow = false;
    this.taskName = '';
  }

  addTask() {
    this.listService.addTask(this.selectedListId, this.taskName);
    this.taskName = '';
    this.showNewTaskRow = false;
  }

  openMenu() {
    this.showMenu = true;
  }

  closeMenu() {
    this.showMenu = false;
  }

  openFilter() {
    this.showFilter = true;
  }

  closeFilter() {
    this.showFilter = false;
  }

  deleteList() {
    this.closeList();
    this.listService.deleteList(this.selectedListId);
  }

  deleteTask(taskId: number) {
    this.listService.deleteTask(taskId, this.selectedListId);
  }

  updateTaskCompleted(taskId:number){
    this.listService.updateTaskCompleted(this.selectedListId, taskId);
  }
}
