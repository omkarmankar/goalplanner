import { Component, inject } from '@angular/core';
import { TaskService } from '../../core/services/task/task.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../../core/models/classes/master';
import { ITaskList } from '../../core/models/interfaces/master';
import { UserService } from '../../core/services/user/user.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [AsyncPipe,DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  taskService = inject(TaskService)
  router = inject(Router);
  taskList$:Observable<ITaskList[]> = new Observable<ITaskList[]>
  userService = inject(UserService)

  ngOnInit():void {
    this.getAllTasksByUserId()
  }

  createNewTask(){
    this.router.navigateByUrl("/new-task")
  }

  getAllTasksByUserId(){
    this.taskList$ = this.taskService.getAllTaskByUserId(this.userService.loggedUserDetails.userId)
  }

  updateTask(taskId:number){
   this.router.navigateByUrl("/new-task/"+taskId)
  }

  deleteTask(taskId:number){
    this.taskService.deleteTask(taskId).subscribe((res:any) => {
      this.getAllTasksByUserId()
    },
    (error) => {
      console.log(error.error);
    }
    
  )
  }

 
}
