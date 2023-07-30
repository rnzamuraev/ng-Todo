import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

import { ITaskDao } from "src/app/data/dao/interface/task-dao.interface";
import { ITask } from "src/app/shared/types/task.interface";
import { ApiData } from "src/app/data/api.data";

@Injectable({ providedIn: "root" })
export class TaskDaoArray implements ITaskDao {
  getAll(): Observable<ITask[]> {
    return of(ApiData.task);
  }

  get(id: number): Observable<ITask> {
    return of();
  }

  add(): Observable<ITask> {
    return of();
  }

  update(): Observable<ITask> {
    return of();
  }

  delete(id: number): Observable<ITask> {
    return of();
  }

  search(): Observable<ITask[]> {
    throw of();
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
