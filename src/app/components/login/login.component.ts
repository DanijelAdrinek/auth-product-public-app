import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: '',
    password: ''
  });

  constructor(private AuthService: AuthService, private fb: FormBuilder) {}

  login() {
    this.AuthService.login(this.loginForm.value.email!, this.loginForm.value.password!);
  }
}