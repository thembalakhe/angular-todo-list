import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DatabaseService } from '../../db/db.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.css',
})
export class TasksViewComponent implements OnInit {

  taskName: string | null = null;
  taskDateTime: string | null = '';
  taskPriority: string = 'low';
  todos: any[] = []; 

  constructor(
    private authService: AuthService,
    private router: Router,
    public dbService: DatabaseService
  ) {}

  ngOnInit() {
    this.authService.checkAuthState().subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });

    this.getTask();
  }

  add() {
    console.log("before", this.todos)
    if (this.taskName) {
      let todo = {
        name: this.taskName,
        completed: false,
        priority: this.taskPriority,
        datetime: this.taskDateTime,
      };
      this.addTask(todo);
      this.todos.push(todo)
      console.log("after", this.todos)
    }
  }

  async getTask(): Promise<void> {
    const snapshot = await this.dbService.getTasks();

    this.todos = Object.keys(snapshot).map((key) => ({
      id: key, // Use the key as the id
      ...snapshot[key], // Spread the rest of the todo object properties
    }));
  }

  //fetch task data
  addTask(todo: Object): void {
    this.dbService.addTask(todo);
  }

  deleteTask(id: string): void {
    this.todos = this.todos.filter((obj) => obj.id !== id);
    this.dbService.deleteTask(id);
  }

  isTaskComplete(id: string, bool: boolean = true): void {
    // Find the index of the object with the matching id
    const index = this.todos.findIndex((obj) => obj.id === id);

    // If the object is found, update its 'done' property inside the array
    if (index !== -1) {
      this.todos[index].completed = bool;
      this.dbService.createOrUpdateData(id, bool);
    }
  }

}
