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

  public PickWeekOfADay = (day: Date): number => 
  {
    var daysOfWeekArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const t = 24 * 60 * 60 * 1000;
    var currentDate = new Date();
    var startDate = new Date(currentDate.getFullYear(), 0, 1);
    console.log(startDate);
    console.log(day);
    var days = Math.floor((day.getTime() - startDate.getTime() + 2*t) /
        (t));
         
    var weekNumber = Math.ceil(days / 7);
    console.log(weekNumber);
    return weekNumber;

  }

}
