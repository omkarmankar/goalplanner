import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { constant } from '../../constant/constant';
import { Task } from '../../models/classes/master';
import { Observable } from 'rxjs';
import { ITaskList } from '../../models/interfaces/master';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  http = inject(HttpClient)
  constructor() { }

  createTask(taskObj:Task):Observable<Task>{
    return this.http.post<Task>(environment.API_URL + constant.API_METHOD_NAME.TASK.CREATE_TASK,taskObj)
  }

  getAllTaskByUserId(userId:number):Observable<ITaskList[]>{
    return this.http.get<ITaskList[]>(environment.API_URL + constant.API_METHOD_NAME.TASK.GET_ALL_TASKS_BY_USER+userId)
  }

  getTaskById(taskId:number):Observable<ITaskList>{
    return this.http.get<ITaskList>(environment.API_URL + constant.API_METHOD_NAME.TASK.GET_TASK_BY_TASKID+taskId)
  }

  updateTask(taskObj:Task):Observable<Task>{
    return this.http.put<Task>(environment.API_URL + constant.API_METHOD_NAME.TASK.UPDATE_TASK,taskObj)
  }

  deleteTask(taskId:number):Observable<any>{
    return this.http.delete<any>(environment.API_URL + constant.API_METHOD_NAME.TASK.DELETE_TASK+taskId)
  }
}
