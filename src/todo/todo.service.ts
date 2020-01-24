import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.model';
import * as uuid from 'uuid/v1'
import { AddTodoDto } from './dto/add-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';

@Injectable()
export class TodoService {
    private todos: Todo[] = [];
    
    getAllTodo() : Todo[] {
        return this.todos;
    }

    getTodoWithFilters(filterDto: GetTodoFilterDto): Todo[] {
        const { status, search } = filterDto

        let todos = this.getAllTodo();

        if(status){
            todos = todos.filter(todo => todo.status === status)
        }

        if(search){
            todos = todos.filter(
                todo => todo.title.includes(search) ||
                todo.description.includes(search)
            )
        }

        return todos
    }

    getTodoById(id: string): Todo {
        const foundTodo = this.todos.find(todo => todo.id === id)

        if(!foundTodo){
            throw new NotFoundException(`Task with ID ${id} not found!`)
        }

        return foundTodo
    }

    addTodo(addTodoDto: AddTodoDto): Todo {
        const {title, description} = addTodoDto
        const todo: Todo = {
            id: uuid(),
            title,
            description,
            status: TodoStatus.IN_PROGRESS
        }
        this.todos.push(todo);
        return todo
    }

    deleteTodo(id: string): void {
        const foundTodo = this.getTodoById(id)
        this.todos = this.todos.filter(todo => todo.id !== foundTodo.id)
    }

    updateTodoStatus(id: string, status: TodoStatus) : Todo {
        const todo = this.getTodoById(id)

        todo.status = status
        return todo
    }
    
}
