import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../../db/db.service';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from '../../components/tasks-view/tasks-view.component';



@Component({
  selector: 'app-home',
  imports: [CommonModule, TasksViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

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
  }

  onLogout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
