import { Component } from '@angular/core';
import { TaskList, Tasks, Data } from 'src/app/model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  //public taskList: Array<TaskList>=[{task:"Novo", checked: true}];
  public TasksList: Array<Tasks>= (localStorage.getItem("localStorageTaskList") != null) ?
  JSON.parse(localStorage.getItem('localStorageTaskList') || '{}')
  :
  [];
  public DataList: Array<Data>= (localStorage.getItem("localStorageDataList") != null) ?
  JSON.parse(localStorage.getItem('localStorageDataList') || '{}')
  :
  [];

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
    const TIME_CONVERT = 24 * 60 * 60 * 1000;

    var daysOfWeekArr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var timeOfDayTwo = dayTwo.getTime()/TIME_CONVERT;
    
    var DayToBeCompared = dayOne.getTime()/TIME_CONVERT;
    var index = daysOfWeekArr.findIndex(item => item.localeCompare(this.GetDayOfWeekOfAData(dayOne.toDateString())) === 0);

    
    //FORMULA: TIME OF START DAY OF A WEEK = (DAY TO BE COMPARED) - HOW MUCH TIME FROM SUNDAY PASSED
    //HOW MUCH DAYS FROM SUNDAY PASSED = (ONE DAY TIME)*( HOW MUCH DAYS FROM SUNDAY PASSED)
    //ONE DAY TIME = 1
    //HOW MUCH DAYS FROM SUNDAY PASSED = INDEX OF WEEK LIST
    //HOW MUCH DAYS FROM SUNDAY PASSED = (1)*(INDEX OF WEEK LIST)

    //FORMULA: TIME OF LAST DAY OF A WEEK = (DAY TO BE COMPARED) - HOW MUCH TIME NEED TO SATURDAY
    //...


    var firstDayOfTheWeek = DayToBeCompared -  1*(index);
    var lastDayOfTheWeek = DayToBeCompared +  1*(6-index);
    


    if(timeOfDayTwo <= lastDayOfTheWeek && timeOfDayTwo >= firstDayOfTheWeek){return true;}

    return false;


    /*
    

        var daysOfWeekArr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const t = 24 * 60 * 60 * 1000;
    var timeOfOneDay = (new Date((new Date()).getFullYear(), 0, 1)).getTime()/t - (new Date((new Date()).getFullYear(), 0, 2)).getTime()/t;

    var time = dayOne.getTime()/t;
    var index = daysOfWeekArr.findIndex(item => item.localeCompare(this.GetDayOfWeekOfAData(dayOne.toDateString())) === 0);

    //index*(timeOfOneDay+1) = sun (first day of week) --> the preview days of this week
    //firstDayOfTheWeek = the start day of this week
    var firstDayOfTheWeek = dayOne.getTime()/t - index*(timeOfOneDay+1);
    //index*(6-timeOfOneDay) = Sat (last day of week) --> the next days of this week
    //lastDayOfTheWeek = end of week
    var lastDayOfTheWeek = dayOne.getTime()/t + index*(6-timeOfOneDay);
    var dayTwoTime = dayTwo.getTime()/t;

    
    if(dayTwoTime <= lastDayOfTheWeek && dayTwoTime >= firstDayOfTheWeek){console.log(true); return true;}

    console.log(false);
    return false;
    */
  }

  public GetDayOfWeekOfAData(day: string)
  {
    let dayString = (new Date(day)).toString();
    let weekDay = dayString[0]+dayString[1]+dayString[2];
    return weekDay;
    
  }

}
