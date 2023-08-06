import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../shared/types/task.interface'
import { ICategory } from '../shared/types/category.interface'
import { IPriority } from '../shared/types/priority.interface'
import { EStaticVariables } from '../shared/types/staticVariable.enum'

@Pipe({
  name: 'tasksFilter'
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
    console.log(category);

    if (searchText !== "") {
      tasks = data.filter(task => task.name === searchText);
    }

    if (category !== null && category.name !== EStaticVariables.INITIAL_ACTIVE_CATEGORY) {
      tasks = data.filter(task => task.category && task.category.id === category.id);
    }

    if (priority !== null) {
      tasks = data.filter(task => task.priority === priority);
    }

    if (status !== null) {
      tasks = data.filter(task => task.status === status);
    }

    console.log(tasks);
    return tasks;
  }
}
