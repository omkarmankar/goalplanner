export const constant = {
    API_METHOD_NAME:{
        USER:{
            CREATE_USER:"register",
            LOGIN:"login",
        },
        GOAL:{
            CREATE_GOAL:"createGoalWithMilestones",
            GET_ALL_GOALS_BY_USER:"getAllGoalsByUser?userId="
        },
        TASK:{
            CREATE_TASK:"createTask",
            GET_ALL_TASKS_BY_USER:"getAllTasks?userId=",
            GET_TASK_BY_TASKID:"getTask/",
            UPDATE_TASK:"updateTask",
            DELETE_TASK:"deleteTask/"
        }
    },
    SECURITY_KEYS:{

    },
    VALIDATION_MESSAGES:{
        REQUIRED:"This is Required",
        EMAIL:"Email Id is Invalid",
    },
    REG_EX:{
        PANCARD:"",
        AADHAR_CARD:""
    },
    LOCAL_STORAGE_KEYS:{
        LOGGED_USER:"gp-user"
    },
    TASK_FREQUENCY:{
        DAILY:"Daily",
        WEEKLY:"Weekly",
        MONTHLY:"Monthly",
    }
}