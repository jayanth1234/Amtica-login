import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessage } from 'angular-flash-message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private router:Router,
              private authService: AuthService,
              private flashMessage: FlashMessage) { }

  ngOnInit() {
  }

  onLoginSubmit(){
     const user = {
       username: this.username,
       password: this.password
     }

     this.authService.authenticateUser(user).subscribe(data => {
       if(data.success){
          this.authService.storeUserData(data.token, data.user);
          this.flashMessage.success('Logged In successfully', {delay: 3000, close: true});
          this.router.navigate(['/dashboard'])
       }else{
          this.flashMessage.danger(data.msg, {delay: 3000, close: true});
          this.router.navigate(['/'])
       }
     })
  }

}
