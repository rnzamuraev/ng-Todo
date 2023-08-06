import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";

import { ApiData } from "src/app/data/api.data";
import { ITaskDao } from "src/app/data/dao/interface/task-dao.interface";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { ITask } from "src/app/shared/types/task.interface";
import { CategoryDaoArray } from "./category-dao.array";

@Injectable({ providedIn: "root" })
export class TaskDaoArray implements ITaskDao {
  constructor(private localStorage: LocalStorageService, private categoryDao: CategoryDaoArray) {}

  getAll(): Observable<ITask[]> {
    let data: null | ITask[] = this.localStorage.get(EStaticVariables.TOKEN_FOR_TASKS);
    console.log(data);

    if (data === null) {
      data = ApiData.task;
      this._set(data);
    }

    return of(data);
  }

  get(id: number): Observable<ITask> {
    return this.getAll().pipe(map(tasks => tasks.filter(task => task.id === id)[0]));
  }

  post(obj: ITask): Observable<ITask[]> {
    return this.getAll().pipe(
      map(data => {
        let id = 1;
        const arrId = data.map(task => task.id);
        console.log(arrId);

        if (arrId.length !== 0) id = Math.max(...arrId) + 1;

        console.log(id);
        obj.id = id;
        const tasks: ITask[] = [obj, ...data];

        console.log(tasks);
        this._set(tasks);
        return tasks;
      })
    );
  }

  put(obj: ITask): Observable<ITask[]> {
    return this.getAll().pipe(
      map(tasks => {
        const ind = tasks.findIndex(task => task.id === obj.id);
        tasks.splice(ind, 1, obj);

        console.log("put: ", tasks);
        this._set(tasks);
        return tasks;
      })
    );
  }

  delete(obj: ITask): Observable<ITask[]> {
    return this.getAll().pipe(
      map(tasks => {
        const newTasks = tasks.filter(task => task.id !== obj.id);
        this._set(newTasks);
        return newTasks;
      })
    );
  }

  private _set(array: ITask[]) {
    this.localStorage.set(EStaticVariables.TOKEN_FOR_TASKS, array);
  }

  search(
    searchText: string,
    category: ICategory | null,
    priority: IPriority | null,
    status: boolean | null
  ): Observable<ITask[]> {
    return this.getAll().pipe(
      map(data => this._searchTasks(data, searchText, category, priority, status))
    );
  }

  private _searchTasks(
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

  getCountOfCompletedTasksInCategory(): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getCountOfUncompletedTasksInCategory(): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getTotalCountTasksInCategory(): Observable<number> {
    throw new Error("Method not implemented.");
  }

  getTotalCountTasks(): Observable<number> {
    throw new Error("Method not implemented.");
  }
}
