export interface Todo {
    id: string,
    title: string,
    description: string,
    status: TodoStatus
}

export enum TodoStatus{
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}