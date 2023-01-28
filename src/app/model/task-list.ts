export interface TaskList {
    task: string, 
    checked: boolean
}

export interface Tasks {
    taskName: string,
    taskDescription: string, 
    date: Date,
    category: string,
    hashId: string
}

export interface Data {
    dataName: string,
    dataInfo: string, 
    category: string,
    hashId: string
}