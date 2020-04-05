import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, TodoInputComponent, TodoListComponent, TodoItemCompletedInputCheckboxComponent, FilterItemsInputButtonComponent, ClearCompletedTodoInputButtonComponent } from './app.component';
import { TodoStoreService } from './todo-store.service';

@NgModule({

  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoListComponent,
    TodoItemCompletedInputCheckboxComponent,
    FilterItemsInputButtonComponent,
    ClearCompletedTodoInputButtonComponent,
  ],

  providers: [
    TodoStoreService,
  ],



  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
})
export class AppModule { }
