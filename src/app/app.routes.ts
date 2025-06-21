import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { TeacherComponent } from './dashboard/teacher/teacher';
import { StudentComponent } from './dashboard/student/student';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'teacher-dashboard', component: TeacherComponent },
  { path: 'student-dashboard', component: StudentComponent },
  { path: '**', redirectTo: '/login' }
];

