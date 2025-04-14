import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { TaskService } from '../../core/services/task/task.service';
import { Task } from '../../core/models/classes/master';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { ActivatedRoute, Params } from '@angular/router';
import { ITaskList } from '../../core/models/interfaces/master';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-new-task',
  imports: [ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent implements OnInit {

  userService = inject(UserService)
  taskService = inject(TaskService)
  activatedRoute = inject(ActivatedRoute);
  taskId:number = 0;

  taskForm:FormGroup|any;

  
  ngOnInit():void {
    this.activatedRoute.params.subscribe((params:Params) => {
      this.taskId = params['id'];
    })

    if(this.taskId!=null){
      this.taskService.getTaskById(this.taskId).subscribe((res:ITaskList) => {
        if(res){
          this.initializeForm(res)
        }
      })
    }else{
      this.initializeForm()
    }
  }

  initializeForm(task?:ITaskList){
    let startDate: string = "";
    let dueDate: string = "";
    
    if(task!=null){
     startDate = formatDate(task.startDate, 'yyyy-MM-dd', 'en');
     dueDate = formatDate(task.dueDate, 'yyyy-MM-dd', 'en');
    }

    this.taskForm =  new FormGroup({
      taskId: new FormControl(task?task.taskId:0),
      taskName:new FormControl(task?task.taskName:"",[Validators.required]),
      description:new FormControl(task?task.description:"",[Validators.required]),
      frequency:new FormControl(task?task.frequency:"",[Validators.required]),
      createdDate:new FormControl(new Date),
      startDate:new FormControl(task?startDate:"",[Validators.required]),
      dueDate:new FormControl(task?dueDate:"",[Validators.required]),
      isCompleted: new FormControl(false),
      userId: new FormControl(this.userService.loggedUserDetails.userId)
    })
  }

  saveTask(){
    this.taskService.createTask(this.taskForm.value).subscribe((res:Task) =>{
      if(res){
        alert("Task Added")
      }
    },
    error => {
      alert(error.error);
    })
  }

  updateTask(){
    this.taskService.updateTask(this.taskForm.value).subscribe((res:Task) =>{
      if(res){
        alert("Task Updated")
      }
    },
    error => {
      alert(error.error);
    })
  }

  resetForm(){
    this.taskForm.reset();
  }
}
