import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TodoServerService } from 'src/app/services/todo-server.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  task: Task | null = null;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private todoServerService: TodoServerService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
          this.todoServerService.getTask(params.id).subscribe(
            response => this.task = response
          );
      });
  }

  onSave() {
    if (!this.task.id) {
      this.task.id = this.todoServerService.getAvailableTaskId();
      this.todoServerService.createTask(this.task).subscribe(
        () => this.router.navigate([''])
      );
    } else {
      this.todoServerService.updateTask(this.task).subscribe(
        () => this.router.navigate([''])
      );
    }
  }

  onCancel() {
    this.router.navigate(['']);
  }
}
