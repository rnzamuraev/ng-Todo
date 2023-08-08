import { Pipe, PipeTransform } from "@angular/core";
import { ICategory } from "../shared/types/category.interface";
import { IPriority } from "../shared/types/priority.interface";
import { EStaticVariables } from "../shared/types/staticVariable.enum";
import { ITask } from "../shared/types/task.interface";

@Pipe({
  name: "tasksFilter",
})
export class TasksFilterPipe implements PipeTransform {
  transform(
    data: ITask[],
    searchText: string,
    category: ICategory | null,
    priority: IPriority | null,
    status: boolean | null
  ): ITask[] {
    let tasks = data;

    if (searchText !== "") {
      tasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchText.trim().toLowerCase())
      );
    }

    if (category !== null && category.name !== EStaticVariables.INITIAL_ACTIVE_CATEGORY) {
      tasks = tasks.filter(task => task.category && task.category.id === category.id);
    }

    if (priority !== null) {
      tasks = tasks.filter(task => task.priority && task.priority.id === priority.id);
    }

    if (status !== null) {
      tasks = tasks.filter(task => task.status === status);
    }

    console.log(tasks);
    return tasks;
  }
}
