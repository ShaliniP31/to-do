import { TaskModel } from './task.model';

export interface ListModel {
    id: number,
    name: string,
    tasks: TaskModel[];
}