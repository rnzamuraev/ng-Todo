import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CategoryDaoArray } from 'src/app/data/dao/array/category-dao.array'
import { PriorityDaoArray } from "src/app/data/dao/array/priority-dao.array";
import { TaskDaoArray } from "src/app/data/dao/array/task-dao.array";

// import { Data } from "src/app/data/api.data";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { ITask } from "src/app/shared/types/task.interface";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(
    private localStorage: LocalStorageService,
    private taskDataArray: TaskDaoArray,
    private priorityDataArray: PriorityDaoArray,
    private categoryDataArray: CategoryDaoArray,
  ) {}

  public getAllTasks(): Observable<ITask[]> {
    const data: null | ITask[] = this.localStorage.get(EStaticVariables.TOKEN_FOR_TASKS);
    console.log(data);

    if (data === null) {
      return this.taskDataArray.getAll();
    } else return of(data);
  }

  public filterByCategory(data: ITask[], category: string): ITask[] {
    return data.filter(task => task.category?.name === category);
  }

  public getAllCategories(): Observable<ICategory[]> {
    const data: null | ICategory[] = this.localStorage.get(EStaticVariables.TOKEN_FOR_CATEGORY);
    console.log(data);

    if (data === null) {
      return this.categoryDataArray.getAll();
    } else return of(data);
  }

  public getAllPriorities(): Observable<IPriority[]> {
    const data: null | IPriority[] = this.localStorage.get(EStaticVariables.TOKEN_FOR_CATEGORY);
    console.log(data);

    if (data === null) {
      return this.priorityDataArray.getAll();
    } else return of(data);
  }
}
