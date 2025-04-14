export class UserRegister {
    userId: number;
    emailId: string;
    password: string;
    fullName: string;
    mobileNo: string;

    constructor() {
        this.userId = 0;
        this.emailId = "";
        this.password = "";
        this.fullName = "";
        this.mobileNo = "";
    }
}

export class UserLogin {
    emailId: string;
    password: string;

    constructor() {
        this.emailId = "";
        this.password = "";
    }
}

export interface Goal {
    goalId: number
    goalName: string
    description: string
    startDate: string
    endDate: string
    isAchieved: boolean
    userId: number
    milestones: Milestone[]
}

export interface Milestone {
    milestoneId: number
    milestoneName: string
    description: string
    targetDate: string
    isCompleted: boolean
}


export class Task {
    taskId: number;
    taskName: string;
    description: string;
    frequency: string;
    createdDate: string;
    startDate: string;
    dueDate: string;
    isCompleted: boolean;
    userId: number

    constructor() {
        this.taskId = 0;
        this.taskName = "";
        this.description = "";
        this.frequency = "";
        this.createdDate = "";
        this.startDate = "";
        this.dueDate = "";
        this.isCompleted = false;
        this.userId = 0;
    }
}
