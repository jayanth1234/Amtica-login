import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: Object;

  constructor(private router:Router,
              private authService: AuthService,
              private flashMessage: FlashMessage) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user
    },
    err => {
      console.log(err);
      return false;
    })
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.info('You were Logged Out', {delay: 3000, close: true});
    this.router.navigate(['/']);
    return false;
  }

}
