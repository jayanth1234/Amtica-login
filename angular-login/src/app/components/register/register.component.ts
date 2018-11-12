import { FlashMessage } from 'angular-flash-message';
import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  email: String;
  username: String;
  password: String;

  constructor(private flashMessage: FlashMessage, 
              private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.danger('Please fill in all fields!', {delay: 3000, close: true});
      return false;
    }

    //Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.danger('Please use valid email', {delay: 3000, close: true});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      console.log(data);
      if(data.success){
        this.flashMessage.success('User successfully Registered!! Now you can Login', {delay: 3000, close: true});
        this.router.navigate(['/'])
      }else { 
        this.flashMessage.danger('Something went wrong', {delay: 3000, close: true});
        this.router.navigate(['/register'])
      }
    })
  }


}
