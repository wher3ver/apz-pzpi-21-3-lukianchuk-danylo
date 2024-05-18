import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthenticatedResponse } from '../models/authenticated-response';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/api/services/auth.service';
import { LoginRequest } from 'src/app/api/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  credentials: LoginRequest = {userName:'', password:''};

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  login = ( form: NgForm) => {
    if (form.valid) {
      this.authService.apiAuthLoginPost({body: this.credentials})
      .subscribe({
        next: (response: any) => {
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/home"]);
        },
        error: (err: HttpErrorResponse) => this.invalidLogin = true
      });
      // this.http.post<AuthenticatedResponse>("http://localhost:5001/api/Auth/login", this.credentials, {
      //   headers: new HttpHeaders({ "Content-Type": "application/json"})
      // })
      // .subscribe({
      //   next: (response: AuthenticatedResponse) => {
      //     const token = response.token;
      //     console.log(response);
      //     console.log(token);
      //     localStorage.setItem("jwt", token); 
      //     this.invalidLogin = false; 
      //     this.router.navigate(["/home"]);
      //   },
      //   error: (err: HttpErrorResponse) => this.invalidLogin = true
      // })
    }
  }
}
