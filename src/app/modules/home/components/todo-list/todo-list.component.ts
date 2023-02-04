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
    var daysOfWeekArr2 = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
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
  public IsTheSameWeek = (dayOne: Date, dayTwo: Date): boolean => 
  {
    /*
      Here the problem is how you know is two days are in the same week.
      The solution is pick 'dayOne', discover the week day (sun, mon...) 
      Knowing that we know too  ...

    */
    var daysOfWeekArr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const t = 24 * 60 * 60 * 1000;
    var oneDayTime = (new Date((new Date()).getFullYear(), 0, 1)).getTime()/t - (new Date((new Date()).getFullYear(), 0, 2)).getTime()/t;

    var time = dayOne.getTime()/t;
    var index = daysOfWeekArr.findIndex(item => item.localeCompare(this.GetDayOfWeekOfAData(dayOne.toDateString())) === 0);

    //index*(oneDayTime+1) = sun (first day of week) --> the preview days of this week
    //startDayOfWeek = the start day of this week
    var startDayOfWeek = dayOne.getTime()/t - index*(oneDayTime+1);
    //index*(6-oneDayTime) = Sat (last day of week) --> the next days of this week
    //endDayOfWeek = end of week
    var endDayOfWeek = dayOne.getTime()/t + index*(6-oneDayTime);
    var dayTwoTime = dayTwo.getTime()/t;

    
    if(dayTwoTime <= endDayOfWeek && dayTwoTime >= startDayOfWeek) return true;

    return false;
  }

  public GetDayOfWeekOfAData(day: string)
  {
    let dayString = (new Date(day)).toString();
    let weekDay = dayString[0]+dayString[1]+dayString[2];
    return weekDay;
    
  }

}
