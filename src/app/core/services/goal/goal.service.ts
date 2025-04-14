import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { constant } from '../../constant/constant';
import { Goal } from '../../models/classes/master';
import { Observable } from 'rxjs';
import { IGoalsList } from '../../models/interfaces/master';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  http = inject(HttpClient);
  constructor() { }

  createGoalWithMilestones(goalObj:Goal){
    return this.http.post(environment.API_URL + constant.API_METHOD_NAME.GOAL.CREATE_GOAL,goalObj);
  }

  getAllGoalsByUser(userId:number) : Observable<IGoalsList[]>{
    return this.http.get<IGoalsList[]>(environment.API_URL + constant.API_METHOD_NAME.GOAL.GET_ALL_GOALS_BY_USER+userId);
  }
 
}