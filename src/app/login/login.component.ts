import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';
import { CookiesStorageService, LocalStorageService, SessionStorageService, SharedStorageService } from "ngx-store";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
Login:FormGroup;
  formSumitAttempt: boolean;
  fieldTextType: boolean;
  constructor(private fb:FormBuilder,private apiService:ApiService, 
     private router: Router, private localStorage: SessionStorageService,
     private auth: AuthService,
    private ngZone: NgZone,
    private myRoute: Router) { }

  ngOnInit() {
    this.Login = this.fb.group({
      // name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  onSubmit() {
    this.formSumitAttempt=true
    const payload={
      email:this.Login.value.email,
      password:this.Login.value.password
    }
    if (!this.Login.valid) {
      return false;
    } else {
      this.apiService.loginUser(payload).subscribe(
        (res) => {
          console.log("data",res);
          // this.localStorage.set('accessToken', res.data.accessToken);
          console.log('login Successfully!')
          this.formSumitAttempt=false;
          // this.ngZone.run(() => this.router.navigateByUrl('/create-employee'))
          this.auth.sendToken(this.Login.value.email)
          this.myRoute.navigate(["create-employee"]);
        }, (error) => {
          console.log(error);
        });
    }

  }
  isFieldValid(field: string) {
    return (
      (!this.Login.get(field).valid && this.Login.get(field).touched) ||
      (this.Login.get(field).untouched && this.formSumitAttempt)
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
