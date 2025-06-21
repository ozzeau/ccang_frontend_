import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  title: string;
  description: string;
  teacherName: string;
  createdAt: Date;
}

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './teacher.html',
  styleUrl: './teacher.css'
})
export class TeacherComponent implements OnInit {
  userEmail: string = '';
  courses: Course[] = [];
  newCourse = {
    title: '',
    description: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.loadCourses();
  }

  addCourse() {
    if (this.newCourse.title && this.newCourse.description) {
      const course: Course = {
        id: Date.now(),
        title: this.newCourse.title,
        description: this.newCourse.description,
        teacherName: this.userEmail,
        createdAt: new Date()
      };
      
      this.courses.push(course);
      this.saveCourses();
      
      // Reset form
      this.newCourse = { title: '', description: '' };
      
      alert('Course added successfully!');
    }
  }

  loadCourses() {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      this.courses = JSON.parse(savedCourses).filter((course: Course) => 
        course.teacherName === this.userEmail
      );
    }
  }

  saveCourses() {
    const allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    const otherCourses = allCourses.filter((course: Course) => 
      course.teacherName !== this.userEmail
    );
    const updatedCourses = [...otherCourses, ...this.courses];
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}

