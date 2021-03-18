import { environment } from '../../../environments/environment';
export class ApiUrlConstant {

    private static appurl = environment.apiUrl;

    // master api
    public static get LOGIN(): string { return this.appurl + '/user/login'; }
    public static get REGISTERUSER(): string { return this.appurl + '/user/register'; }
    public static get GETUSERBYID(): string { return this.appurl + '/user/getUserById'};
    public static get GETTASKS(): string { return this.appurl + '/task/getTaskByUserId'};
    public static get GETTASKBYID(): string { return this.appurl + '/task/getTaskById'};
    public static get DELETETASK(): string { return this.appurl + '/task/deleteTaskByTaskId'};
    public static get ADDTASK(): string { return this.appurl + '/task/addTask'};
    public static get EDITTASK(): string { return this.appurl + '/task/updateTaskByTaskId'};
    public static get EXPORTTASK(): string { return this.appurl + '/task/exportExcelTaskList'};
    
}