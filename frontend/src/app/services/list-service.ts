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

    private updateLists(updater: (lists: ListModel[]) => ListModel[]) {
        this.listsSignal.update(lists => {
            const updated = updater(lists);
            this.saveLists(updated);
            return updated;
        });
    }
    addList(name: string) {
        this.updateLists(lists => [
            ...lists,
            {
                id: this.nextId++,
                name,
                tasks: []
            }
        ]);
    }

    deleteList(id: number) {
        this.updateLists(lists =>
            lists.filter(list => list.id !== id)
        );
    }

    addTask(listId: number, taskName: string) {
        this.updateLists(lists =>
            lists.map(list => {
                if (list.id !== listId) return list;

                const nextTaskId =
                    Math.max(0, ...list.tasks.map(t => t.id)) + 1;

                return {
                    ...list,
                    tasks: [
                        ...list.tasks,
                        {
                            id: nextTaskId,
                            name: taskName,
                            completed: false
                        }
                    ]
                };
            })
        );
    }

    deleteTask(taskId: number, listId: number) {
        this.updateLists(lists =>
            lists.map(list => {
                if (list.id !== listId) return list;
                return {
                    ...list,
                    tasks: list.tasks.filter(task => task.id !== taskId)
                };
            })
        );
    }

    updateTaskCompleted(listId: number, taskId: number) {
        this.updateLists(lists =>
            lists.map(list => {
                if (list.id !== listId) return list;

                return {
                    ...list,
                    tasks: list.tasks.map(task =>
                        task.id === taskId
                            ? { ...task, completed: !task.completed }
                            : task
                    )
                };
            })
        );
    }

}
