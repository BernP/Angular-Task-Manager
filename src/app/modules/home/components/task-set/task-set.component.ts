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

      for(let i = 0; i < this.taskCategories.length; i++)
      { 
        if(this.taskCategory.includes(this.taskCategories[i].name))
        {
          this.taskCategories[i].amount++;
          break;
        }
      }
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
    for(let i = 0; i < this.tasks.length; i++)
    {
      if((this.tasks[i].hashId).localeCompare(taskIdToDelete) === 0)
      {
        this.tasks.splice(i, 1);
        break;
      }
    }
    for(let i = 0; i < this.filtredTasks.length; i++)
    {
      if((this.filtredTasks[i].hashId).localeCompare(taskIdToDelete) === 0)
      {
        this.filtredTasks.splice(i, 1);
        break;
      }
    }
    for(let i = 0; i < this.taskCategories.length; i++)
    { 
      if(this.taskCategory.includes(this.taskCategories[i].name))
      {
        this.taskCategories[i].amount--;
        break;
      }
    }
    
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

  public TimeToEndTask(taskDate1: Date)
  {
    var taskDate = new Date(taskDate1);
    var today = new Date();
    //var today = new Date().toLocaleDateString('en-CA');
    if(Math.floor((taskDate.getTime() - today.getTime()) / 1000 / 60 / 60 / 24) + 1 === 0)
    {
      return "Your task ends today!";
    }
    else if(taskDate > today)
    {
      var daysToEnd =  Math.floor((taskDate.getTime() - today.getTime()) / 1000 / 60 / 60 / 24)+1;
      return "You have "+daysToEnd+" day(s) to complete this task!";
    }
    else{
      var daysToEnd =  Math.floor((today.getTime() - taskDate.getTime()) / 1000 / 60 / 60 / 24) +1;
      return "The 'time to end' this task passed "+daysToEnd+" day(s) ago!";
    }

  }

}
