import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";
import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { ITask } from "src/app/shared/types/task.interface";
import { EStaticVariables } from "../shared/types/staticVariable.enum";

@Injectable({
  providedIn: "root",
})
export class StateService {
  // private activeTaskCategoryName$ = new BehaviorSubject<string>(
  //   EStaticVariables.INITIAL_ACTIVE_CATEGORY
  // );
  private activeTaskCategory$ = new BehaviorSubject<ICategory | null>(null);
  private tasks$ = new BehaviorSubject<ITask[]>([]);
  private categories$ = new BehaviorSubject<ICategory[]>([]);
  private priorities$ = new BehaviorSubject<IPriority[]>([]);

  constructor(private dataService: DataService) {}

  // *** activeTaskCategoryName ***//
  // public get getActiveTaskCategoryName$(): Observable<string> {
  //   return this.activeTaskCategoryName$.asObservable();
  // }
  // public setActiveTaskCategoryName$(data: string): void {
  //   this.activeTaskCategoryName$.next(data);
  // }

  // *** activeTaskCategory ***//
  public get getActiveTaskCategory$(): Observable<ICategory | null> {
    return this.activeTaskCategory$.asObservable();
  }
  public setActiveTaskCategory$(data: ICategory | null): void {
    this.activeTaskCategory$.next(data);
  }

  // *** Tasks ***//
  public get getTasks$(): Observable<ITask[]> {
    return this.tasks$.asObservable();
  }
  public setTasks$(
    data: ITask[],
    text: string,
    category: ICategory | null,
    priority: IPriority | null,
    status: boolean | null
  ): void {
    console.log(data);
    const tasks = this.dataService.filterTask(data, text, category, priority, status);
    this.tasks$.next(tasks);
    console.log(tasks);
  }

  // *** Categories ***//
  public get getCategories$(): Observable<ICategory[]> {
    return this.categories$.asObservable();
  }
  public setCategories$(data: ICategory[]): void {
    this.categories$.next(data);
    // this.categories = data;
  }

  // *** Priorities ***//
  public get getPriorities$(): Observable<IPriority[]> {
    return this.priorities$.asObservable();
  }
  public setPriorities$(data: IPriority[]): void {
    this.priorities$.next(data);
  }
}
