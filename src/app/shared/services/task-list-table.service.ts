import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import { ITask } from "src/app/shared/types/task.interface";

@Injectable({
  providedIn: "root",
})
export class TaskListTableService {
  private tasks$ = new Subject<ITask[]>();
  private isTaskCompleted$ = new Subject<ITask[]>();

  constructor() {}

  public get getTasks$(): Observable<ITask[]> {
    return this.tasks$.asObservable();
  }

  public setTasks$(data: ITask[]): void {
    this.tasks$.next(data);
  }
}
