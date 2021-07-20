import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() task: Task;
  @Output() delete = new EventEmitter();
  @Output() done = new EventEmitter();
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onUpdate() {
    this.router.navigate(['task', this.task.id]);
  }

  onDelete() {
    this.delete.emit('');
  }

  onDone() {
    this.done.emit('');
  }
}
