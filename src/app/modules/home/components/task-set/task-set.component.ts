import { Component, Input } from '@angular/core';
import { Tasks, Data } from 'src/app/model/task-list';


@Component({
  selector: 'app-task-set',
  templateUrl: './task-set.component.html',
  styleUrls: ['./task-set.component.scss']
})
export class TaskSetComponent {

  @Input() tasks: Array<Tasks> = [];
  @Input() data: Array<Data> = [];
  @Input() filter: any;
  @Input() taskCategories: any;
  @Input() filtredTasks: Array<Tasks> = [];
  @Input() filtredData: Array<Data> = [];
  @Input() dataCategories: any;
  @Input() taskDatesFilter: any;


  //=================
  //  TASK INPUT
  //=================
  public date: Date = new Date();
  public taskDescription: string = "";
  public taskName: string = "";
  public taskCategory: string = "";
  

  //=================
  //  DATA INPUT
  //=================
  public dataName: string ="";
  public dataInfo: string = "";
  public dataCategory: string = "";

  public AddTask()
  {

      this.tasks.push({taskName: this.taskName, taskDescription: this.taskDescription, date: this.date, category: this.taskCategory, hashId: this.CreateHashId(this.taskName)})

      var deltaDay = this.GetDeltaTime(new Date(this.date));

      for(let i = 0; i < this.taskCategories.length; i++)
      { 
        if(this.taskCategory.includes(this.taskCategories[i].name))
        {
          this.taskCategories[i].amount++;
          break;
        }
      }
      //Index: 0 = all dates
      this.taskDatesFilter[0].amount++;
      if(deltaDay === 0)
      {
        this.taskDatesFilter[1].amount++;
      }
      else if(deltaDay < 0) this.taskDatesFilter[2].amount++;
      else if(new Date(this.date).getMonth() === new Date().getMonth()) this.taskDatesFilter[3].amount++;
      //THIS IS WRONG, but is a test

  }

  public AddData()
  {
    this.data.push({dataName: this.dataName, dataInfo: this.dataInfo, category:  this.dataCategory, hashId: this.CreateHashId(this.dataName)});

    for(let i = 0; i < this.dataCategories.length; i++)
      { 
        if(this.dataCategory.includes(this.dataCategories[i].name))
        {
          this.dataCategories[i].amount++;
          break;
        }
      }
  }

  public reloadInitialPage()
  {
    if(this.filter.category == "All" || this.filter.category == "all" )
    {
      this.filtredTasks = this.tasks;
    }
  }



  public deleteTask(taskIdToDelete: string)
  {
    var deltaDay = 0;

    //TASK LIST
    for(let i = 0; i < this.tasks.length; i++)
    {
      if((this.tasks[i].hashId).localeCompare(taskIdToDelete) === 0)
      {
        deltaDay = this.GetDeltaTime(new Date(this.tasks[i].date));
        this.tasks.splice(i, 1);
        
        break;
      }
    }
    //FILTRED TASK LIST
    for(let i = 0; i < this.filtredTasks.length; i++)
    {
      if((this.filtredTasks[i].hashId).localeCompare(taskIdToDelete) === 0)
      {
        this.filtredTasks.splice(i, 1);
        break;
      }
    }
    //TASK CATEGORIES
    for(let i = 0; i < this.taskCategories.length; i++)
    { 
      if(this.taskCategory.includes(this.taskCategories[i].name))
      {
        this.taskCategories[i].amount--;
        break;
      }
    }
    //TASK DATES
    this.taskDatesFilter[0].amount--;
    if(deltaDay === 0) this.taskDatesFilter[1].amount--;
    if(deltaDay < 0) this.taskDatesFilter[2].amount--;
    
  }

  public DeleteData(dataIdToDelete: string)
  {
    for(let i = 0; i < this.tasks.length; i++)
    {
      if((this.data[i].hashId).localeCompare(dataIdToDelete) === 0)
      {
        this.data.splice(i, 1);
        break;
      }
    }
    for(let i = 0; i < this.filtredData.length; i++)
    {
      if((this.filtredData[i].hashId).localeCompare(dataIdToDelete) === 0)
      {
        this.filtredData.splice(i, 1);
        break;
      }
    }
    for(let i = 0; i < this.dataCategories.length; i++)
    { 
      if(this.dataCategory.includes(this.dataCategories[i].name))
      {
        this.dataCategories[i].amount--;
        break;
      }
    }
  }

  public CreateHashId(taskName: string)
  {
    var date = new Date().toLocaleString();
    return ( date + taskName);
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

}
