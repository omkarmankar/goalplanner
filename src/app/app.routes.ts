import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { GoalListComponent } from './pages/goal-list/goal-list.component';
import { NewGoalComponent } from './pages/new-goal/new-goal.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskComponent } from './pages/task/task.component';

export const routes: Routes = [
   
    {
        path:'dashboard',
        component:DashboardComponent
    },
    {
        path:'goals',
        component:GoalListComponent
    },
    {
        path:'new-goal',
        component:NewGoalComponent
    },
    {
        path:'new-task',
        component:NewTaskComponent
    },
    {
        path:'new-task/:id',
        component:NewTaskComponent
    },
    {
        path:'tasks',
        component:TaskComponent
    }
];
