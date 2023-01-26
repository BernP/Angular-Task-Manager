import { Component, Input, OnInit } from '@angular/core';
//import {}from '../../../../../../node_modules/@ng-bootstrap/ng-bootstrap/collapse/collapse'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { Tasks } from 'src/app/model/task-list';


@Component({
  selector: 'app-lateral-menu',
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss']
})
export class LateralMenuComponent implements OnInit {
  @Input() tasks: Array<Tasks> = [];
  public categories:  Array<any> = [{name: 'Personal'}, {name: 'Work'}, {name: 'Studie'}];
  public nonTaskCategories:  Array<any> = [{name: 'All'}, {name: 'Phone numbers'}, {name: 'Passwords tips'}];
  public newItemToAdd: string = "";
  public whereAdd: number = 0;
  public what = "";
  public filterType = {
    type: "taskDate",
    category: "All"
  };
  public filtredTasks: Array<Tasks> = this.tasks;


  public isCollapsed = true;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onChange(event: string) {
    this.newItemToAdd = event;
  }

  public SelectFilterType(type: string, category: string)
  {
    this.filterType.type = type;
    this.filterType.category = category;
    console.log(this.filterType);
    this.FilterTask();
  }

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
  /*
  public AddCategory(event: string){
    this.categories.push({name: event});
    
  }
  */
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
  public AddCategory(){
    if(this.whereAdd == 1)
    {
      this.categories.push({name: this.newItemToAdd});
    }
    else{
      this.nonTaskCategories.push({name: this.newItemToAdd});
    }
    
    this.newItemToAdd = "";
    
  }

  public FilterTask(){
    let aux: Array<Tasks> = [];
    
    for(let i = 0; i < this.tasks.length; i++)
    {
      if(this.filterType.type == "taskDate")
      {
        if(this.tasks[i].date.toLocaleString() == this.filterType.category)
        {aux.push(this.tasks[i]);}
      }
      else if(this.tasks[i].category == this.filterType.category)
      {
        aux.push(this.tasks[i]);
      }
    }
    this.filtredTasks= aux;
    if(this.filterType.category == "All"){this.filtredTasks= aux; return;} 
  }
}
