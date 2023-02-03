import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() PickWeekOfADay: (day: Date) => number;
  @Input() FilterTask: () => void;
  @Input() FilterData: () => void;
  


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

      this.tasks.push({name: this.taskName, info: this.taskDescription, date: this.date, category: this.taskCategory, hashId: this.CreateHashId(this.taskName)})

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
      if( this.PickWeekOfADay(new Date(this.date))  === this.PickWeekOfADay(new Date()) ) this.taskDatesFilter[3].amount++;
      this.FilterTask();
      /**/
      this.taskDescription = "";
      this.taskName = "";
      this.taskCategory  = "";
      

  }



  public AddData()
  {
    this.data.push({name: this.dataName, info: this.dataInfo, category:  this.dataCategory, hashId: this.CreateHashId(this.dataName)});

    for(let i = 0; i < this.dataCategories.length; i++)
      { 
        if(this.dataCategory.includes(this.dataCategories[i].name))
        {
          this.dataCategories[i].amount++;
          break;
        }
      }

    this.dataName = "";
    this.dataInfo  = "";
    this.dataCategory = "";
    this.FilterData();
  }

  public reloadInitialPage()
  {
    if(this.filter.category == "All" || this.filter.category == "all" )
    {
      this.filtredTasks = this.tasks;
    }
  }

  public CreateHashId(taskName: string)
  {
    var date = new Date().toLocaleString();
    return ( date + taskName);
  }

  public GetDeltaTime(someDay: Date)
  {
    var today = new Date();
    return Math.floor((someDay.getTime() - today.getTime()) / 1000 / 60 / 60 / 24)+1;
  }

}
