export interface IApiResponse {
    userId: number,
    emailId: string,
    password: string,
    createdDate: string,
    projectName: string,
    fullName: string,
    mobileNo: string
}

export interface IGoalsList {
    goalId: number,
    goalName: string,
    description: string,
    startDate: string,
    endDate: string,
    isAchieved: boolean,
    userId: number
}

export interface ITaskList {
    taskId: number,
    taskName: string,
    description: string,
    frequency: string,
    createdDate: string,
    startDate: string,
    dueDate: string,
    isCompleted: boolean,
    userId: number
}