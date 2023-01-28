import { Component } from '@angular/core';
import { TaskList, Tasks, Data } from 'src/app/model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  public taskList: Array<TaskList>=[{task:"Novo", checked: true}];
  public TasksList: Array<Tasks>=[];
  public DataList: Array<Data>=[];

  constructor(){}
  ngOnInit(): void{

  }
  public setEmit(event: string){
    this.taskList.push({task: event, checked: false});
    
  }
  public deleteItem(event: number){
    this.taskList.splice(event, 1);
  }
  public deleteAll(){
    const confirm = window.confirm("You are sure?");
    if(confirm)
    {
      this.taskList = [];
    }
    
  }
  public deleteSelected(){
    //for(let i = 0; i < this.taskList.length; i++)
    let index = 0;
    while(index < this.taskList.length)
    {
      if(this.taskList[index].checked) this.taskList.splice(index, 1);
      else index++;
    }
  }

}
