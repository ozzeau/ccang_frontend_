import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private router: Router) {}

  onSignup() {
    if (this.name && this.email && this.password && this.role) {
      console.log('Signup attempt:', { 
        name: this.name, 
        email: this.email, 
        role: this.role 
      });
      
      alert('Account created successfully! Please login.');
      this.router.navigate(['/login']);
    }
  }
}

