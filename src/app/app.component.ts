import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-store';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router,private localStorage: SessionStorageService,private auth: AuthService){}
  title = 'Employees';
}
