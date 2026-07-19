import { Injectable, signal } from '@angular/core';
import { ListModel } from '../model/list.model';
import { TaskModel } from '../model/task.model';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    nextId: number = 1;

    private listsSignal = signal<ListModel[]>(this.loadLists());
    lists = this.listsSignal.asReadonly();

    private loadLists(): ListModel[] {
        const data = localStorage.getItem('lists');
        const lists: ListModel[] = data ? JSON.parse(data) : [];
        if (lists.length > 0) {
            this.nextId =
                Math.max(...lists.map(list => list.id)) + 1;
        }
        return lists;
    }

    private saveLists(lists: ListModel[]) {
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    addList(name: string) {
        this.listsSignal.update(lists => {
            const newList: ListModel = {
                id: this.nextId++,
                name,
                tasks: []
            };
            const updateLists = [...lists, newList];
            this.saveLists(updateLists);
            return updateLists;
        });
    }

    addTask(listId: number, taskName: string) {
        this.listsSignal.update(lists => {
            const updateLists = lists.map(list => {
                if (list.id !== listId) {
                    return list;
                }

                const nextTaskId =
                    list.tasks.length === 0
                        ? 1
                        : Math.max(...list.tasks.map(task => task.id)) + 1;

                const newTask: TaskModel = {
                    id: nextTaskId,
                    name: taskName,
                    completed: false
                };

                return {
                    ...list,
                    tasks: [...list.tasks, newTask]
                };
            })
            this.saveLists(updateLists);
            return updateLists;
        });
    }


}
