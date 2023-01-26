import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-set',
  templateUrl: './task-set.component.html',
  styleUrls: ['./task-set.component.scss']
})
export class TaskSetComponent {

  @Input() tasks: Array<any> | undefined;

}
