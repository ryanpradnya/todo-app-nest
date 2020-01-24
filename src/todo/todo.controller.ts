import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, TodoStatus } from './todo.model';
import { AddTodoDto } from './dto/add-todo.dto';
import { GetTodoFilterDto } from './dto/get-todo-filter.dto';
import { TodoStatusValidationPipe } from './pipe/todo-status-validation.pipe';

@Controller('todo')
export class TodoController {
    constructor(private todoService:TodoService){}

    @Get()
    getAllTodo(@Query() filterDto: GetTodoFilterDto): Todo[] {
        if(Object.keys(filterDto).length){
            return this.todoService.getTodoWithFilters(filterDto);
        }
        return this.todoService.getAllTodo();
    }

    @Get(':id')
    getTodoById(@Param('id') id: string): Todo {
        return this.todoService.getTodoById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    addTodo(@Body() addTodoDto: AddTodoDto): Todo {
        return this.todoService.addTodo(addTodoDto);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string): void {
        this.todoService.deleteTodo(id);
    }

    @Patch(':id/update-status')
    updatedTodoStatus(
        @Param('id') id: string,
        @Body('status', TodoStatusValidationPipe) status: TodoStatus
    ): Todo {
        return this.todoService.updateTodoStatus(id, status)
    }
}
