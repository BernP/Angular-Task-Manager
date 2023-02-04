import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import {}from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap/collapse/collapse'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { Tasks, Data } from 'src/app/model/task-list';


@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss']
})
export class LateralMenuComponent{

  @Input() PickWeekOfADay: (day: Date) => number;
  @Input() IsTheSameWeek: (dayOne: Date, dayTwo: Date) => boolean;

  @Input() tasks: Array<any> = (localStorage.getItem("localStorageTaskList") != null) ?
                                    JSON.parse(localStorage.getItem('localStorageTaskList') || '{}')
                                    :
                                    [];
  @Input() data: Array<any> = (localStorage.getItem("localStorageDataList") != null) ?
                                    JSON.parse(localStorage.getItem('localStorageDataList') || '{}')
                                    :
                                    [];
  public categories:  Array<any> = (localStorage.getItem("localStorageTaskCategories") != null) ?
                                    JSON.parse(localStorage.getItem('localStorageTaskCategories') || '{}')
                                    :
                                    [{name: 'Personal', amount: 0}, {name: 'Work', amount: 0}, {name: 'Studie', amount: 0}];

  public taskDatesFilter:  Array<any> = (localStorage.getItem("localStorageTaskDatesCategories") != null) ?
                                    JSON.parse(localStorage.getItem('localStorageTaskDatesCategories') || '{}')
                                    :
                                    [{name: 'All dates', amount: 0}, {name: 'Today', amount: 0}, {name: 'Over Timed', amount: 0}, {name: 'This Week', amount: 0}];
  public nonTaskCategories:  Array<any> = (localStorage.getItem("localStorageDataCategories") != null) ?
                                    JSON.parse(localStorage.getItem('localStorageDataCategories') || '{}')
                                    :
                                    [{name: 'All', amount: 0}, {name: 'Phone numbers', amount: 0}, {name: 'Passwords tips', amount: 0}];
  public whatToSearchFor: string = "";
  public newItemToAdd: string = "";
  public whereAdd: number = 0;
  public what = "";
  public filterType = {
    type: "taskDate",
    category: "All"
  };
  public filtredTasks: Array<Tasks> = this.tasks;
  public filtredData: Array<Data> = this.data;


  public isCollapsed = true;

  onChange(event: string) {
    this.newItemToAdd = event;
  }

  public SelectFilterType(type: string, category: string)
  {
    this.filterType.type = type;
    this.filterType.category = category;
    if(type.includes("task") || type.includes("Task"))
    {
      this.FilterTask();
    }
    else
    {
      this.FilterData();
    }
    
  }



  //==========================
  //  DELETE CATEGORY IN MENU
  //==========================
  
  public deleteCategory(event: number, type: number){
    let cf = confirm("Are you sure to delete this category?")
    if(cf){
      if(type == 1)
      {
        this.categories.splice(event, 1);
        localStorage.setItem('localStorageTaskCategories', JSON.stringify(this.categories));
      }
      else
      {
        this.nonTaskCategories.splice(event, 1);
        localStorage.setItem('localStorageDataCategories', JSON.stringify(this.nonTaskCategories));
        
      }
      
    }
    
  }

  //==========================
  //  ADD THE TYPE OF FILTER WILL BE USED
  //==========================

  public TypeOfAdd(type: number){
    this.whereAdd = type;
    if(type == 2)
    {
      this.what = "'Data (non task)'";
    }
    else
    {
      this.what = "'Task - category'";
    }
  }  
  //==========================
  //  ADD CATEGORY IN MENU (NEW FILTER)
  //==========================
  public AddCategory(){
    if(this.whereAdd == 1)
    {
      this.categories.push({name: this.newItemToAdd, amount: 0});
      localStorage.setItem('localStorageTaskCategories', JSON.stringify(this.categories));
    }
    else{
      this.nonTaskCategories.push({name: this.newItemToAdd, amount: 0});
      localStorage.setItem('localStorageDataCategories', JSON.stringify(this.nonTaskCategories));
    }
    
    this.newItemToAdd = "";
    
  }


  //==========================
  //  FILTER TASKS
  //==========================
  public FilterTask = (): void =>{
    let aux: Array<Tasks> = [];
    if(this.filterType.category.includes("All") || this.filterType.category.includes("all"))
    {
      this.filtredTasks= this.tasks;
      return;
    }
    if(this.filterType.type.localeCompare("taskDate") === 0 && this.filterType.category.includes("Week"))
    {
      //var thisWeekNumber = this.PickWeekOfADay(new Date());
      for(let i = 0; i < this.tasks.length; i++)
      {
        //if(this.PickWeekOfADay(new Date(this.tasks[i].date)) === thisWeekNumber)
        
        if(this.IsTheSameWeek(new Date(this.tasks[i].date), new Date()))
        {
          aux.push(this.tasks[i]);
        }
      }
      aux.sort((a,b) => b.date < a.date ? 1 : (b.date > a.date) ? -1 : 0);
      this.filtredTasks = aux;
      return;
    } 
    var today = new Date().toLocaleDateString('en-CA');


    for(let i = 0; i < this.tasks.length; i++)
    {

      if(this.filterType.type.includes("taskDate"))
      {

        if(this.filterType.category.includes("Today") && this.tasks[i].date.toString() === today)
        {
          aux.push(this.tasks[i]);
        }
        else if(this.filterType.category.includes("Timed") && this.tasks[i].date.toString() < today)
        {
          aux.push(this.tasks[i]);
        }
      }
      else if(this.filterType.category.includes(this.tasks[i].category))
      {
        aux.push(this.tasks[i]);
      }
    }
    this.filtredTasks= aux;
  }

  //==========================
  //  FILTER DATA
  //==========================
  public FilterData = (): void =>{
    let aux: Array<Data> = [];

    
    if(this.filterType.category.includes("all") || this.filterType.category.includes("All"))
    {
      this.filtredData = this.data;

      return;
    }



    for(let i = 0; i < this.data.length; i++)
    {

      if(this.filterType.category.includes(this.data[i].category) )
      {
        aux.push(this.data[i]);
      }
    }
    this.filtredData= aux;
  }


  //==========================
  //  SEARCH (FILTER DISPLAYED TASK) BY TERM
  //==========================
  public Search(searchTerm: string)
  {
    let searchResult: Array<Tasks> = [];
    for(let i = 0; i < this.tasks.length; i++)
    {
      if(this.tasks[i].name.includes(searchTerm))
      {
        searchResult.push(this.tasks[i]);

      }
      else
      {
        if(this.tasks[i].info.includes(searchTerm))
        {
          searchResult.push(this.tasks[i]);

        }
      }
    }

    let searchDataResult: Array<Data> = [];
    for(let i = 0; i < this.data.length; i++)
    {
      if(this.data[i].name.includes(searchTerm))
      {
        searchDataResult.push(this.data[i]);

      }
      else
      {
        if(this.data[i].info.includes(searchTerm))
        {
          searchDataResult.push(this.data[i]);

        }
      }
    }

    this.filtredData = searchDataResult;
    this.filtredTasks = searchResult;
    this.whatToSearchFor = '';
    this.filterType.category = "Search results for '"+searchTerm+"'";
    //this.filterType.type = "";
  }


}
