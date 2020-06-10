import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
Register:FormGroup;
  submitted: boolean=false;
  constructor(private fb:FormBuilder,private apiService:ApiService,  private router: Router,
    private ngZone: NgZone,) { }

  ngOnInit() {
    this.getusers();
    this.Register = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      // phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }


  onSubmit() {
    const payload={
      name:this.Register.value.name,
      email:this.Register.value.email,
      password:this.Register.value.password

    }
    // this.submitted = true;
    if (!this.Register.valid) {
      return false;
    } else {
      this.apiService.registerUser(payload).subscribe(
        (res) => {
          console.log('Register Successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/login'))
        }, (error) => {
          console.log(error);
        });
    }
  }
getusers(){
  this.apiService.getUsers().subscribe(res=>{
    console.log("users",res);
  })
}
}
