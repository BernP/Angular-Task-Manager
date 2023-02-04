import { Component, Input } from '@angular/core';
import { Data, Tasks } from 'src/app/model/task-list';

@Component({
  selector: 'app-item-show-box',
  templateUrl: './item-show-box.component.html',
  styleUrls: ['./item-show-box.component.scss']
})
export class ItemShowBoxComponent {

  @Input() PickWeekOfADay: (day: Date) => number;
  @Input() FilterTask: () => void;
  @Input() FilterData: () => void;

  @Input() tasks: Array<Tasks> = [];
  @Input() data: Array<Data> = [];
  @Input() filter: any;
  @Input() taskCategories: any;
  @Input() filtredTasks: Array<Tasks> = [];
  @Input() filtredData:  any;
  @Input() dataCategories: any;
  @Input() taskDatesFilter: any;
  @Input() dataCategory: any;
  @Input() taskCategory:  any;


  public DeleteBtn(IdToBeDeleted: string, filter: any)
  {
    if(filter.type.includes('task') || filter.type.includes('Task')) this.DeleteTask(IdToBeDeleted)
    else this.DeleteData(IdToBeDeleted)
  }


  public DeleteTask(taskIdToDelete: string)
  {
    
    var indexToDelete = this.tasks.findIndex(item => { return (item.hashId.localeCompare(taskIdToDelete) === 0)});
    //var indexFilterToDelete = this.filtredTasks.findIndex(item => { return (item.hashId.localeCompare(taskIdToDelete) === 0)});
    var itemCategory= this.tasks[indexToDelete].category;
    var deltaDay  = this.GetDeltaTime(new Date(this.tasks[indexToDelete].date));
    var itemDate = this.tasks[indexToDelete].date;
    
    //TASK LIST
    this.tasks.splice(indexToDelete , 1);


    //FILTRED TASK LIST
    //this.filtredTasks.splice(indexFilterToDelete , 1);

    //TASK CATEGORIES
    
    var indexCategoryToDelete = this.taskCategories.findIndex(item => { return (item.name.includes(itemCategory))});
    this.taskCategories[indexCategoryToDelete].amount--;

    //TASK DATES: 0 = all days, 1 = Today (variation os time = 0), 2 = Overtimed task (variation of time is negative) and 3 = this week
    this.taskDatesFilter[0].amount--;
    if(deltaDay === 0) this.taskDatesFilter[1].amount--;
    else if(deltaDay < 0) this.taskDatesFilter[2].amount--;
    if(this.PickWeekOfADay(new Date(itemDate)) === this.PickWeekOfADay(new Date())) this.taskDatesFilter[3].amount--;
    this.FilterTask();
  }

  public DeleteData(dataIdToDelete: string)
  {

    var indexToDelete = this.data.findIndex(item => { return (item.hashId.localeCompare(dataIdToDelete) === 0)});

    var itemCategory= this.data[indexToDelete].category;

    this.data.splice(indexToDelete , 1);

    if(!itemCategory.includes("All") && !itemCategory.includes("all"))
    {
      var indexCategoryToDelete = this.dataCategories.findIndex(item => { return (item.name.includes(itemCategory))});
      this.dataCategories[indexCategoryToDelete].amount--;
    }
    
    var indexAll = this.dataCategories.findIndex(item => { return (item.name.includes("All") || item.name.includes("all"))});
    this.dataCategories[indexAll].amount--;

    this.FilterData();
    
  }

  public TimeToEndTask(taskDate: Date)
  {
    //This function will count how many days left to complete a task or how many days passed to the 'end line'
    //Input: the day to be compared with today
    //Output: A string with how many days left/passed to complete a task
    var deltaDay = this.GetDeltaTime(new Date(taskDate));


    if(deltaDay === 0)
    {
      return "Your task ends today!";
    }
    else if(deltaDay > 0)
    {
      var singleDate = deltaDay === 1 ? "":"s";
      return "You have "+deltaDay+" day" +singleDate+ " left to complete this task!";

    }
    else{
      deltaDay *= -1;

      var singleDate = deltaDay === 1 ? "":"s";
      return "The end line ended "+deltaDay+" day"+ singleDate +" ago!";

    }


  }

  public GetDeltaTime(someDay: Date)
  {
    var today = new Date();
    return Math.floor((someDay.getTime() - today.getTime()) / 1000 / 60 / 60 / 24)+1;
  }

  public GetDayOfWeekOfAData(day: string)
  {
    let dayString = (new Date(day)).toString();
    let weekDay = dayString[0]+dayString[1]+dayString[2];
    return weekDay;
    
  }

}
