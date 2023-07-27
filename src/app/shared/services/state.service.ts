import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ITask } from "../types/task.interface";

@Injectable({
  providedIn: "root",
})
export class StateService {
  private categoryTask$ = new BehaviorSubject<string>("All");
  private tasks$ = new Subject<ITask[]>();
  // private isTaskCompleted$ = new Subject<ITask[]>();

  constructor() {}

  // *** categoryTask ***//
  public get getCategoryTask$(): Observable<string> {
    return this.categoryTask$.asObservable();
  }
  public setCategoryTask$(data: string): void {
    this.categoryTask$.next(data);
  }

  // *** Tasks ***//
  public get getTasks$(): Observable<ITask[]> {
    return this.tasks$.asObservable();
  }
  public setTasks$(data: ITask[]): void {
    this.tasks$.next(data);
  }
}
