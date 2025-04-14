import { inject, OnInit, ViewChild } from '@angular/core';
import { signal } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { UserService } from './core/services/user/user.service';
import { Subscription } from 'rxjs';
import { IApiResponse } from './core/models/interfaces/master';
import { NgIf } from '@angular/common';
import { constant } from './core/constant/constant';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, ReactiveFormsModule,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  @ViewChild("loginModal") loginModal!: ElementRef;
  isLoginVisible = signal<boolean>(true);

  userService = inject(UserService)
  router = inject(Router)
  subscriptions: Subscription[] = [];
  loggedUserData:any;

  ngOnInit(){
    debugger;
    this.getLocalData();
  }

  getLocalData(){
    if(this.userService.loggedUserDetails!=null){
      this.loggedUserData = this.userService.loggedUserDetails;
    }
  }
  

  registerForm: FormGroup = new FormGroup({
    userId: new FormControl<number>(0),
    fullName: new FormControl<string>("", [Validators.required]),
    emailId: new FormControl<string>("", [Validators.required, Validators.email]),
    password: new FormControl<string>("", [Validators.required]),
    mobileNo: new FormControl<string>("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  })

  loginForm: FormGroup = new FormGroup({
    emailId: new FormControl<string>("", [Validators.required, Validators.email]),
    password: new FormControl<string>("", [Validators.required])
  })

  toggleForm() {
    this.isLoginVisible.set(!this.isLoginVisible());
  }

  showLoginForm() {
    this.isLoginVisible.set(true);
  }


  openModal() {
    this.showLoginForm();
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'block';
    }
  }

  closeModal() {
    if (this.loginModal) {
      this.loginModal.nativeElement.style.display = 'none';
    }
  }

  registerUser() {
    this.subscriptions.push(
      this.userService.createUser(this.registerForm.value).subscribe((res: any) => {
        if (res) {
          this.closeModal();
          console.log(res);
        }
      },error => {
        alert(error.error);
      }
      )
    )
  }

  login() {
    this.subscriptions.push(
      this.userService.userLogin(this.loginForm.value).subscribe((res: IApiResponse) => {
        if(res) {
          this.closeModal();
          localStorage.setItem(constant.LOCAL_STORAGE_KEYS.LOGGED_USER, JSON.stringify(res));
          this.router.navigate(['dashboard'])
          this.userService.loggedUserDetails = res;
          this.getLocalData();
        }
      },error => {
        alert(error.error);
      })
    )
  }

  logOff(){
    localStorage.removeItem(constant.LOCAL_STORAGE_KEYS.LOGGED_USER);
    this.loggedUserData = undefined;
    this.router.navigate(['/'])
  }

  ngOnDestroy():void {
    this.subscriptions.forEach( element => {
      element.unsubscribe();
    })
  }

}
