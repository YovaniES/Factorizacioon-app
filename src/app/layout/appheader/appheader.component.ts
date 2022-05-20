import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.sass']
})
export class AppheaderComponent implements OnInit {

  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit() {
    
  }

  logout(){
    this.authentication.logout();
    this.router.navigate(['login']);
  }
}
