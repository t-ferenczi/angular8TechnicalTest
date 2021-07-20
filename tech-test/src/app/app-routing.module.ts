import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';


const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'task/:id', component: EditTaskComponent },
  { path: 'task', component: EditTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
