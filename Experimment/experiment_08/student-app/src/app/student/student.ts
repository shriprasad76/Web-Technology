import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  rollNumber: string;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.html',
  styleUrl: './student.css',
  imports: [CommonModule, FormsModule]
})
export class StudentComponent {
  name: string = '';
  age: number = 0;
  email: string = '';
  rollNumber: string = '';
  students: Student[] = [];
  nextId: number = 1;
  editingId: number | null = null;

  addStudent() {
    if (this.name.trim() && this.email.trim() && this.rollNumber.trim() && this.age > 0) {
      if (this.editingId !== null) {
        // Update existing student
        const student = this.students.find(s => s.id === this.editingId);
        if (student) {
          student.name = this.name;
          student.age = this.age;
          student.email = this.email;
          student.rollNumber = this.rollNumber;
        }
        this.editingId = null;
      } else {
        // Add new student
        this.students.push({
          id: this.nextId++,
          name: this.name,
          age: this.age,
          email: this.email,
          rollNumber: this.rollNumber
        });
      }
      this.resetForm();
    }
  }

  deleteStudent(id: number) {
    this.students = this.students.filter(s => s.id !== id);
    if (this.editingId === id) {
      this.editingId = null;
      this.resetForm();
    }
  }

  editStudent(student: Student) {
    this.name = student.name;
    this.age = student.age;
    this.email = student.email;
    this.rollNumber = student.rollNumber;
    this.editingId = student.id;
  }

  resetForm() {
    this.name = '';
    this.age = 0;
    this.email = '';
    this.rollNumber = '';
    this.editingId = null;
  }
}