import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";

import { IPriorityDao } from "src/app/data/dao/interface/priority-dao.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { ApiData } from "src/app/data/api.data";

@Injectable({ providedIn: "root" })
export class PriorityDaoArray implements IPriorityDao {
  getAll(): Observable<IPriority[]> {
    return of(ApiData.priorities);
  }

  get(): Observable<IPriority> {
    return of();
  }

  add(): Observable<IPriority> {
    return of();
  }

  update(): Observable<IPriority> {
    return of();
  }

  delete(): Observable<IPriority> {
    return of();
  }
}
