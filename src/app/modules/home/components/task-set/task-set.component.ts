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

  @Input() IsTheSameWeek: (dayOne: Date, dayTwo: Date) => boolean;
  @Input() FilterTask: () => void;
  @Input() FilterData: () => void;
  


  //=================
  //  TASK INPUT
  //=================
  public date: Date = new Date();
  public taskDescription: string;
  public taskName: string;
  public taskCategory: string;
  

  //=================
  //  DATA INPUT
  //=================
  public dataName: string;
  public dataInfo: string;
  public dataCategory: string;

  public AddTask()
  {

      this.tasks.push(
      {
        name: this.taskName,
        info: this.taskDescription,
        date: this.date, 
        category: (this.taskCategory != null && this.taskCategory != '') ? this.taskCategory : "#000NoCategory",
        hashId: this.CreateHashId(this.taskName)
      });

    

      var deltaDay = this.GetDeltaTime(new Date(this.date+"T00:00"));

      for(let i = 0; i < this.taskCategories.length; i++)
      { 
        if(this.tasks[this.tasks.length-1].category.includes(this.taskCategories[i].name))
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
      if(this.IsTheSameWeek(new Date(this.date+"T00:00"), new Date())){this.taskDatesFilter[3].amount++; console.log(this.taskDatesFilter[3].amount);} 
      //console.log(this.IsTheSameWeek(new Date(this.date+"T00:00"), new Date()));
      //this.IsTheSameWeek(new Date(this.date), new Date())===true
      //if( this.PickWeekOfADay(new Date(this.date))  === this.PickWeekOfADay(new Date()) ) this.taskDatesFilter[3].amount++;
      
      
      
      this.FilterTask();
      /**/
      this.taskDescription = "";
      this.taskName = "";
      this.taskCategory  = "";
      
      localStorage.setItem('localStorageTaskList', JSON.stringify(this.tasks));
      localStorage.setItem('localStorageTaskDatesCategories', JSON.stringify(this.taskDatesFilter));
      localStorage.setItem('localStorageTaskCategories', JSON.stringify(this.taskCategories));
  }



  public AddData()
  {
    this.data.push(
    {
      name: this.dataName, 
      info: this.dataInfo, 
      category: (this.dataCategory.length>0 && this.dataCategory != '') ?this.dataCategory : "#000NoCategory",
      hashId: this.CreateHashId(this.dataName)
    });

    for(let i = 0; i < this.dataCategories.length; i++)
      { 
        if(this.dataCategory.includes(this.dataCategories[i].name))
        {
          this.dataCategories[i].amount++;
          break;
        }
      }


      if(!this.dataCategory.includes("all") && !this.dataCategory.includes("All"))
      {
        for(let i = 0; i < this.dataCategories.length; i++)
        { 

          if(this.dataCategories[i].name.includes("All") || this.dataCategories[i].name.includes("all"))
          {
            
            this.dataCategories[i].amount++;
            break;
          }
        }

      }
      

    this.dataName = "";
    this.dataInfo  = "";
    this.dataCategory = "";
    this.FilterData();

    localStorage.setItem('localStorageDataList', JSON.stringify(this.data));
    localStorage.setItem('localStorageDataCategories', JSON.stringify(this.dataCategories));
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

  public ChangeFilter()
  {
    if(this.filter.type.includes("task") || this.filter.type.includes("Task")) this.filter.type = "Data";
    else this.filter.type = "Task"; 
  }

}
