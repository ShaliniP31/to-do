import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListModel } from '../model/list.model';
import { faSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-list-card',
  imports: [FontAwesomeModule],
  templateUrl: './list-card.html',
  styleUrl: './list-card.css',
})

export class ListCard {
  faSquare = faSquare;
  faSquareCheck = faSquareCheck;

  @Input() list!: ListModel;
}