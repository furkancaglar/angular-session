import { Injectable } from '@angular/core';
import { TodoListComponent } from './app.component';


export interface TodoEntity {
    title: string
    isCompleted: boolean
    isVisible: boolean
}

@Injectable({
    providedIn: null,
})
export class TodoStoreService {

    todoList: TodoEntity[] = [
        {
            title: 'Finish the task',
            isCompleted: false,
            isVisible: true
        },
        {
            title: 'Take a shower',
            isCompleted: true,
            isVisible: true
        },
    ];

    add(title: string) {
        this.todoList.push({
            isVisible: true,
            isCompleted: false,
            title: title,
        });
    }

    updateIsChecked(updatedIndex: number, isChecked: boolean) {
        this.todoList[updatedIndex].isCompleted = isChecked;
    }

    updateVisibiltyByFilter(filter: string) {
        this.todoList.forEach((todo) => {
            switch (filter) {
                case 'All': {
                    todo.isVisible = true
                    console.log('handleClickAll')
                    console.log(todo)

                    break;
                }
                case 'Active': {
                        if (!todo.isCompleted) {
                            todo.isVisible = true;
                        } else {
                            todo.isVisible = false;
                        }
                        console.log('handleClickActive');
                        console.log(todo);

                    break;
                }
                case 'Completed': {
                        if (todo.isCompleted) {
                            todo.isVisible = true;
                        } else {
                            todo.isVisible = false;
                        }
                        console.log('handleClickCompleted');
                        console.log(todo);

                    break;
                }

            }
        });
    }



    clearCompleted() {
        console.log(this.todoList);
        this.todoList.forEach((todo, idx) => {
            if (todo.isCompleted) {
                this.todoList.splice(idx, 1);
            }
        });
        console.log('clearCompleted');
        console.log(this.todoList);
    }

    removeitemFromList(idx: number) {
        this.todoList.splice(idx, 1);
        console.log('removeitemFromList');
        console.log(this.todoList);
    }

}