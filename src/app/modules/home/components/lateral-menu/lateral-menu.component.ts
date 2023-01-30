import { Component, Input, OnInit } from '@angular/core';
//import {}from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap/collapse/collapse'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { Tasks, Data } from 'src/app/model/task-list';


@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss']
})
export class LateralMenuComponent{
  @Input() tasks: Array<Tasks> = [];
  @Input() data: Array<Data> = [];
  public categories:  Array<any> = [{name: 'Personal', amount: 0}, {name: 'Work', amount: 0}, {name: 'Studie', amount: 0}];
  public nonTaskCategories:  Array<any> = [{name: 'All', amount: 0}, {name: 'Phone numbers', amount: 0}, {name: 'Passwords tips', amount: 0}];
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
    console.log(this.filterType);
    if(type.includes("task") || type.includes("Task"))
    {
      this.FilterTask();
      console.log("-- task --");
      console.log(this.filterType);
    }
    else
    {
      this.FilterData();
    }
    
  }

  //==========================
  //  Find occorences CATEGORY 
  //==========================
  public FindTaskAmount(choosenCat: string){
    for(let i = 0; i < this.categories.length; i++)
    {
      if(choosenCat === this.categories[i].name)
      {
        return this.categories[i].amount.toString();
      }
    }
  }


  //==========================
  //  DELETE CATEGORY IN MENU
  //==========================
  
  public deleteCategory(event: number, type: number){
    let cf = confirm("You sure to delete this category?")
    if(cf){
      if(type == 1)
      {
        this.categories.splice(event, 1);
      }
      else
      {
        this.nonTaskCategories.splice(event, 1);
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
    }
    else{
      this.nonTaskCategories.push({name: this.newItemToAdd, amount: 0});
    }
    
    this.newItemToAdd = "";
    
  }


  //==========================
  //  FILTER TASKS
  //==========================
  public FilterTask(){
    let aux: Array<Tasks> = [];
    if(this.filterType.category.includes("All") || this.filterType.category.includes("all"))
    {
      this.filtredTasks= this.tasks;
      return;
    }
    if(this.filterType.type.localeCompare("taskDate") === 0 && this.filterType.category.includes("Calendar"))
    {
      aux = this.tasks;
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
  public FilterData(){
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
      if(this.tasks[i].taskName.includes(searchTerm))
      {
        searchResult.push(this.tasks[i]);

      }
      else
      {
        if(this.tasks[i].taskDescription.includes(searchTerm))
        {
          searchResult.push(this.tasks[i]);

        }
      }
    }
    this.filtredTasks = searchResult;
    this.whatToSearchFor = '';
    this.filterType.category = "Search results";
    //this.filterType.type = "";
  }


}
