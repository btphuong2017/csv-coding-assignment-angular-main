import { BreadcrumbService } from '@/services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(
    private _breadcrumb: BreadcrumbService
  ) { }

  ngOnInit(): void {
  }

}
