import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email && this.password && this.role) {
      console.log('Login attempt:', { email: this.email, role: this.role });
      
      if (this.role === 'teacher') {
        this.router.navigate(['/teacher-dashboard']);
      } else if (this.role === 'student') {
        this.router.navigate(['/student-dashboard']);
      }
      
      localStorage.setItem('userRole', this.role);
      localStorage.setItem('userEmail', this.email);
    }
  }
}

