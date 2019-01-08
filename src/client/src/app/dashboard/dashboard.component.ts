import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private menuItems: {}[];
  private isCollasped: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isCollasped = false;
    this.menuItems = [
      {
        label: 'Users',
        value:'users',
        routerLink: ['/dashboard/users'],
        icon: 'user'
      },
      {
        label: 'Datasets',
        value:'users',
        routerLink: ['/dashboard/datasets'],
        icon: 'table'
      },
      {
        label: 'Algorithms',
        value:'users',
        routerLink: ['/dashboard/datasets'],
        icon: 'robot'
      }
    ]
  }

}
