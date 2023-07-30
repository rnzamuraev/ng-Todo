import { Observable } from "rxjs";

import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { ITask } from "src/app/shared/types/task.interface";
import { ICommonDao } from "./common-dao.interface";

export interface ITaskDao extends ICommonDao<ITask> {
  search(
    searchText: string,
    category: ICategory,
    priority: IPriority,
    status: boolean
  ): Observable<ITask[]>;

  getCountOfCompletedTasksInCategory(): Observable<number>;

  getCountOfUncompletedTasksInCategory(): Observable<number>;

  getTotalCountTasksInCategory(): Observable<number>;

  getTotalCountTasks(): Observable<number>;
}
