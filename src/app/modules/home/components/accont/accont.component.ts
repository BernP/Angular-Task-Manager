import { Component } from '@angular/core';

@Component({
  selector: 'app-accont',
  templateUrl: './accont.component.html',
  styleUrls: ['./accont.component.scss']
})
export class AccontComponent {

  public ClearLocalStorage()
  {
    if (confirm("All data and tasks will be deleted forever. Do you want to proceed?") == true) {
      localStorage.clear();
      window.location.reload();
    }
  }

}
