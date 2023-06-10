import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation } from '@/animations';


  
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  animations: [slideInAnimation]
})
export class TaskComponent implements OnInit {

  constructor(private contexts: ChildrenOutletContexts) { }

  ngOnInit(): void {
  }

  getRouteAnimationData() {
    
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
