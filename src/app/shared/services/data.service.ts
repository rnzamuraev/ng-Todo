import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Data } from "src/app/data/test.data";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { ITask } from "src/app/shared/types/task.interface";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private localStorage: LocalStorageService) {}

  public fetchData(): Observable<ITask[]> {
    const data: null | ITask[] = this.localStorage.get(EStaticVariables.TOKEN_FOR_TASKS);
    console.log(data);

    if (data === null) {
      return of(Data.task);
    } else return of(data);
  }

  public filterByCategory(data: ITask[], category: string): ITask[] {
    return data.filter(task => task.category?.name === category);
  }

  public getCategories(): Observable<ICategory[]> {
    const data: null | ICategory[] = this.localStorage.get(EStaticVariables.TOKEN_FOR_CATEGORY);
    console.log(data);

    if (data === null) {
      return of(Data.categories);
    } else return of(data);
  }

  public getPriority(): Observable<IPriority[]> {
    const data: null | IPriority[] = this.localStorage.get(EStaticVariables.TOKEN_FOR_CATEGORY);
    console.log(data);

    if (data === null) {
      return of(Data.priorities);
    } else return of(data);
  }
}
