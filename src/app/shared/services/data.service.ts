import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
// 
import { CategoryDaoArray } from "src/app/data/dao/array/category-dao.array";
import { PriorityDaoArray } from "src/app/data/dao/array/priority-dao.array";
import { TaskDaoArray } from "src/app/data/dao/array/task-dao.array";

// import { Data } from "src/app/data/api.data";
import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { ITask } from "src/app/shared/types/task.interface";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(
    private taskDaoArray: TaskDaoArray,
    private priorityDaoArray: PriorityDaoArray,
    private categoryDaoArray: CategoryDaoArray
  ) {}

  // *** Task *** //
  public getAllTasks(): Observable<ITask[]> {
    return this.taskDaoArray.getAll();
  }

  public addTask(obj: ITask): Observable<ITask[]> {
    return this.taskDaoArray.post(obj);
  }

  public updateTask(obj: ITask): Observable<ITask[]> {
    return this.taskDaoArray.put(obj);
  }

  public deleteTask(obj: ITask): Observable<ITask[]> {
    return this.taskDaoArray.delete(obj);
  }

  public filterTask(
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

  // *** Category *** //
  public getAllCategories(): Observable<ICategory[]> {
    return this.categoryDaoArray.getAll();
  }
  public addCategory(obj: ICategory): Observable<ICategory[]> {
    return this.categoryDaoArray.post(obj);
  }
  public updateCategory(obj: ICategory): Observable<ICategory[]> {
    return this.categoryDaoArray.put(obj);
  }
  public deleteCategory(obj: ICategory): Observable<ICategory[]> {
    return this.categoryDaoArray.delete(obj);
  }

  // *** Priority *** //
  public getAllPriorities(): Observable<IPriority[]> {
    return this.priorityDaoArray.getAll();
  }
}
