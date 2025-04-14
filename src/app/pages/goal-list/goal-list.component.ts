import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GoalService } from '../../core/services/goal/goal.service';
import { UserService } from '../../core/services/user/user.service';
import { IGoalsList } from '../../core/models/interfaces/master';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-goal-list',
  imports: [AsyncPipe,DatePipe],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.css'
})
export class GoalListComponent implements OnInit {

  router = inject(Router)
  goalService = inject(GoalService)
  userService = inject(UserService)
  
  goalsList$: Observable<IGoalsList[]> = new Observable<IGoalsList[]>;

  ngOnInit():void {
    this.getAllGoalsByUserId();
  }

  createNewGoal(){
    this.router.navigateByUrl("/new-goal")
  }

  getAllGoalsByUserId(){
   this.goalsList$ = this.goalService.getAllGoalsByUser(this.userService.loggedUserDetails.userId);
  }
}
