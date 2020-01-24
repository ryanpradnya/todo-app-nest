import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TodoStatus } from "../todo.model";

export class TodoStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TodoStatus.IN_PROGRESS,
        TodoStatus.DONE
    ]
    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is invalid status`)
        }
        return value
    }
    
    private isStatusValid(status: any) : boolean {
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1
    }
}