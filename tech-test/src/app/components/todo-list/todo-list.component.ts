import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TodoServerService } from 'src/app/services/todo-server.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() filter: string = '';
  list: Task[] | null = null;

  constructor(
    private todoServer: TodoServerService
  ) { }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.todoServer.getList().subscribe(
      tasks => {
        this.list = tasks as Task[];
        console.log('he>', tasks);
      });
  }

  onDelete(task: Task) {
    this.todoServer.deleteTask(task.id).subscribe(
      () => this.loadList()
    );
  }

  onDone(task: Task) {
    task.done = new Date().toISOString().substr(0, 10);
    this.todoServer.updateTask(task).subscribe(
      () => this.loadList()
    );
  }

  found(task: Task) {
    return this.filter.length == 0
      || [task.label, task.description, task.category].some(
        text => text.indexOf(this.filter) > -1);
  }
}
