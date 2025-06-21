import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  title: string;
  description: string;
  teacherName: string;
  createdAt: Date;
}

interface EnrolledCourse extends Course {
  enrolledAt: Date;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student.html',
  styleUrl: './student.css'
})
export class StudentComponent implements OnInit {
  userEmail: string = '';
  availableCourses: Course[] = [];
  enrolledCourses: EnrolledCourse[] = [];
  enrolledCourseIds: number[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.loadCourses();
    this.loadEnrollments();
  }

  loadCourses() {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      this.availableCourses = JSON.parse(savedCourses);
    }
  }

  loadEnrollments() {
    const savedEnrollments = localStorage.getItem(`enrollments_${this.userEmail}`);
    if (savedEnrollments) {
      this.enrolledCourses = JSON.parse(savedEnrollments);
      this.enrolledCourseIds = this.enrolledCourses.map(course => course.id);
    }
  }

  enrollInCourse(course: Course) {
    if (!this.isEnrolled(course.id)) {
      const enrolledCourse: EnrolledCourse = {
        ...course,
        enrolledAt: new Date()
      };
      
      this.enrolledCourses.push(enrolledCourse);
      this.enrolledCourseIds.push(course.id);
      this.saveEnrollments();
      
      alert(`Successfully enrolled in ${course.title}!`);
    }
  }

  unenrollFromCourse(courseId: number) {
    this.enrolledCourses = this.enrolledCourses.filter(course => course.id !== courseId);
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
    this.saveEnrollments();
    
    alert('Successfully unenrolled from course!');
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  saveEnrollments() {
    localStorage.setItem(`enrollments_${this.userEmail}`, JSON.stringify(this.enrolledCourses));
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}

