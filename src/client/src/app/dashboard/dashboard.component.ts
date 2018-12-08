import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private menuItems: [{}];
  private isCollasped: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.isCollasped = false;
    this.menuItems = [
      {
        label: 'Users',
        routerLink: ['/dashboard/users'],
        icon: 'user'
      }
    ]
  }

}
