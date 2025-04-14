import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoalService } from '../../core/services/goal/goal.service';
import { UserService } from '../../core/services/user/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-new-goal',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './new-goal.component.html',
  styleUrl: './new-goal.component.css'
})
export class NewGoalComponent {

  userService = inject(UserService)
  goalService = inject(GoalService);


  goalForm: FormGroup = new FormGroup({
    goalId: new FormControl(0),
    goalName: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required]),
    startDate: new FormControl(new Date,[Validators.required]),
    endDate: new FormControl(new Date,[Validators.required]),
    isAchieved: new FormControl(false),
    userId: new FormControl(this.userService.loggedUserDetails.userId),
    milestones: new FormArray([])
  });

  constructor() {
    this.addMilestone();
  }



  get MilestonesArray(): FormArray {
    return this.goalForm.get('milestones') as FormArray;
  }

  addMilestone(){
    const milestones = new FormGroup({
      milestoneId: new FormControl(0),
      milestoneName: new FormControl("",[Validators.required]),
      description: new FormControl("",[Validators.required]),
      targetDate: new FormControl(new Date,[Validators.required]),
      isCompleted: new FormControl(false)
    })

    this.MilestonesArray.push(milestones);
  }

  removeMilestone(index:number){
    this.MilestonesArray.removeAt(index);
  }

  saveGoal(){
    this.goalService.createGoalWithMilestones(this.goalForm.value).subscribe((res:any) => {
      if(res){
        alert("Goal Added");
        this.resetForm();
      }
    },error => {
      alert(error.error);
    })
  }

  resetForm(){
    this.goalForm.reset();
  }


}
