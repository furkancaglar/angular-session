import { Component, ViewChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { TodoStoreService, TodoEntity } from './todo-store.service';

@Component({
    template: `
        <input 
            #todoTitleInputElement
            (keydown.enter)="handleKeypress()" 
            placeholder="type something...." 
        />
    `,
    selector: 'app-todo-input'
})
export class TodoInputComponent {


    @ViewChild('todoTitleInputElement')
    todoTitleInputElement: ElementRef<HTMLInputElement>

    handleKeypress() {
        const todoTitle = this.todoTitleInputElement.nativeElement.value
        this.todoStoreService.add(todoTitle);
        this.todoTitleInputElement.nativeElement.value = ""
    }

    constructor(
        private todoStoreService: TodoStoreService,
    ) { }
}

@Component({
    template: `
        <input type="checkbox" [checked]="isChecked" (click)='handleClick()' />
    `,
    selector: 'app-todo-item-completed-input-checkbox'
})
export class TodoItemCompletedInputCheckboxComponent {

    @Input()
    isChecked = false;

    @Output()
    check = new EventEmitter<boolean>();

    handleClick(){
        this.check.next(!this.isChecked)
    }
}

@Component({
    template:`
        <div>
            <button (click)='handleClickAll()' >All</button>
            <button (click)='handleClickActive()' >Active</button>
            <button (click)='handleClickCompleted()' >Completed</button>
        </div>
    `,
    selector: `app-filter-items-input-button`,
})
export class FilterItemsInputButtonComponent {

    constructor(
        public todoStoreService: TodoStoreService, 
    ){}


    handleClickAll() {
        this.todoStoreService.updateVisibiltyByFilter('All');
    }
    handleClickActive() {
        this.todoStoreService.updateVisibiltyByFilter('Active');
    }
    handleClickCompleted() {
        this.todoStoreService.updateVisibiltyByFilter('Completed');
    }

}

@Component({
    template:`
        <div>
            <button (click)='handleClearCompleted()' >Clear Completed</button>
        </div>
    `,
    selector: `app-clear-completed-todo-button`,
})
export class ClearCompletedTodoInputButtonComponent {

    constructor(
        public todoStoreService: TodoStoreService, 
    ){}


    handleClearCompleted() {
        this.todoStoreService.clearCompleted();
    }

}

@Component({
    template: `
        <ul>
            <li aria-label="item" *ngFor="let todo of todoList; let i = index">
                <div *ngIf="todo.isVisible">
                    <app-todo-item-completed-input-checkbox 
                        (check)="handleCheck(i ,$event)"
                        [isChecked]='todo.isCompleted'>
                    </app-todo-item-completed-input-checkbox>

                    <span *ngIf="todo.isCompleted" style="text-decoration: line-through;">
                        {{ todo.title }}
                    </span>
                    <span *ngIf="!todo.isCompleted">
                        {{ todo.title }}
                    </span>
                </div>
            </li>
        </ul>
    `,
    selector: 'app-todo-list'
})
export class TodoListComponent {

    time = 0;
    public get todoList(): TodoEntity[] {
        return this.todoStoreService.todoList;
    }

    constructor(
        public todoStoreService: TodoStoreService,
    ) { }

    handleCheck(idx: number, $event: boolean){
        this.todoStoreService.updateIsChecked(idx, $event);
    }

}


@Component({
    templateUrl: './app.component.html',
    selector: 'app-root',
})
export class AppComponent {
    public name = 'Todo Application with Angular 9'
    get count(): number {
        return this.todoStoreService.todoList.length;
    }
    constructor(private todoStoreService: TodoStoreService) {

    }
}