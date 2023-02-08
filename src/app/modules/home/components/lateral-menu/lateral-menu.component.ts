import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import {}from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap/collapse/collapse'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { Tasks, Data } from 'src/app/model/task-list';


@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss']
})
export class LateralMenuComponent implements OnInit{

  @Input() IsTheSameWeek: (dayOne: Date, dayTwo: Date) => boolean;

  @Input() tasks: Array<any> = [];
  @Input() data: Array<any> = [];
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
  public searchInput: string = "";
  public newCategoryInput: string = "";
  public whereAdd: number = 0;
  public what = "";
  public filterType = {
    type: "taskDate",
    category: "Tasks / Dates / All dates"
  };
  public filtredTasks: Array<Tasks>;
  public filtredData: Array<Data> = this.data;


  public isCollapsed = true;

  ngOnInit()
  {
    this.FilterTask();
    this.ReloadTaskDates();


  }

  public ReloadTaskDates()
  {
    var baseDateArr = [{name: 'All dates', amount: this.tasks.length}, {name: 'Today', amount: 0}, {name: 'Over Timed', amount: 0}, {name: 'This Week', amount: 0}];
    var today = new Date().toLocaleDateString('en-CA');
    var todayDate = new Date();

    for(let i = 0; i < this.tasks.length; i++)
    {
      if(this.tasks[i].date.toString() < today)
      {
        baseDateArr[2].amount++;
      }
      if(this.tasks[i].date.toString() === today)
      {
        baseDateArr[1].amount++;
        baseDateArr[3].amount++;

      }
      else if(this.IsTheSameWeek(new Date(this.tasks[i].date+"T00:00"), todayDate))
      {
        baseDateArr[3].amount++;
      }
    }

    this.taskDatesFilter = baseDateArr;
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
      this.categories.push({name: this.newCategoryInput, amount: 0});
      localStorage.setItem('localStorageTaskCategories', JSON.stringify(this.categories));
    }
    else{
      this.nonTaskCategories.push({name: this.newCategoryInput, amount: 0});
      localStorage.setItem('localStorageDataCategories', JSON.stringify(this.nonTaskCategories));
    }
    
    this.newCategoryInput = "";
    
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
      var todayDate = new Date();
      for(let i = 0; i < this.tasks.length; i++)
      {
        //if(this.PickWeekOfADay(new Date(this.tasks[i].date)) === thisWeekNumber)
        
        if(this.IsTheSameWeek(new Date(this.tasks[i].date+"T00:00"), todayDate))
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
  //  SEARCH BY TERM
  //==========================
  public Search(searchTerm: string)
  {

    // CHECK IF THE SEARCH TERM IS NULL/EMPITY 
    //  if is null/empity will return without process
    if(searchTerm.localeCompare("") === 0)
    {
      this.filtredData = [];
      this.filtredTasks = [];
      this.filterType.category = "Search results for '"+searchTerm+"'";
      return;
    }


    this.filtredData =  this.SearchInSomeList(this.data, searchTerm);
    this.filtredTasks = this.SearchInSomeList(this.tasks, searchTerm);
    this.searchInput = '';
    this.filterType.category = "Search results for '"+searchTerm+"'";

  }


  public SearchInSomeList(list: any, searchTerm: string)
  {
    let searchResult: Array<any> = [];
    for(let i = 0; i < list.length; i++)
    {
      if(list[i].name.includes(searchTerm))
      {
        searchResult.push(list[i]);

      }
      else
      {
        if(this.data[i].info.includes(searchTerm))
        {
          searchResult.push(list[i]);

        }
      }
    }
    return searchResult;

  }


}
