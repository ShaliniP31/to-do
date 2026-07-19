import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from './header/header';
import { NewList } from './new-list/new-list';
import { Content } from './content/content';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Header, NewList, Content],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
