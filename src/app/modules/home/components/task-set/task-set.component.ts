import { Component, Input } from '@angular/core';
import { Tasks } from 'src/app/model/task-list';


@Component({
  selector: 'app-task-set',
  templateUrl: './task-set.component.html',
  styleUrls: ['./task-set.component.scss']
})
export class TaskSetComponent {

  @Input() tasks: Array<Tasks> = [];
  @Input() filter: any;
  @Input() taskCategories: any;
  @Input() filtredTasks: Array<Tasks> = [];


  //public filtredTasks: Array<Tasks> = [];
  public date: Date = new Date();
  public taskDescription: string = "";
  public taskName: string = "";
  public taskCategory: string = "";

  /*
  public FilterTask(type: string, category: string){
    let aux: Array<Tasks> = [];
    for(let i = 0; i < this.tasks.length; i++)
    {
      if(this.tasks[i].category == category && this.filter.type != "taskDate")
      {
        aux.push(this.tasks[i]);
      }
    }
    this.filtredTasks= aux;
  }
  */
  public AddTask(){

      this.tasks.push({taskName: this.taskName, taskDescription: this.taskDescription, date: this.date, category: this.taskCategory})
      console.log(this.tasks);
    }
  public reloadInitialPage()
  {
    if(this.filter.category == "All" || this.filter.category == "all" )
    {
      this.filtredTasks = this.tasks;
    }
  }

}
