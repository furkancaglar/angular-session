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
        switch (filter) {
            case 'All': {
                this.todoList.forEach((todo) => {
                    todo.isVisible = true
                    console.log('handleClickAll')
                    console.log(todo)
                });

                break;
            }
            case 'Active': {
                this.todoList.forEach((todo) => {
                    if (!todo.isCompleted) {
                        todo.isVisible = true;
                    } else {
                        todo.isVisible = false;
                    }
                    console.log('handleClickActive');
                    console.log(todo);
                });
                
                break;
            }
            case 'Completed': {
                this.todoList.forEach((todo) => {
                    if (todo.isCompleted) {
                        todo.isVisible = true;
                    } else {
                        todo.isVisible = false;
                    }
                    console.log('handleClickCompleted');
                    console.log(todo);
                });

                break;
            }
        }
    }

}