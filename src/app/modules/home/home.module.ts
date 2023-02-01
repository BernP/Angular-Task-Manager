import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoButtonDeleteAllComponent } from './components/todo-button-delete-all/todo-button-delete-all.component';
import { TodoInputAddItensComponent } from './components/todo-input-add-itens/todo-input-add-itens.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { TodoButtonDeleteSelectComponent } from './components/todo-button-delete-select/todo-button-delete-select.component';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { TaskSetComponent } from './components/task-set/task-set.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    TodoButtonDeleteAllComponent,
    TodoInputAddItensComponent,
    TodoListComponent,
    HomeComponent,
    TodoButtonDeleteSelectComponent,
    TodoButtonDeleteSelectComponent,
    LateralMenuComponent,
    TaskSetComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NgbModule
  ]
})
export class HomeModule { }
