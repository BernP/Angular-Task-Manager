import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { TaskSetComponent } from './components/task-set/task-set.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemShowBoxComponent } from './components/item-show-box/item-show-box.component';
import { AccontComponent } from './components/accont/accont.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TodoListComponent,
    HomeComponent,
    LateralMenuComponent,
    TaskSetComponent,
    ItemShowBoxComponent,
    AccontComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule
  ]
})
export class HomeModule { }
