import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ApiData } from "src/app/data/api.data";
import { IPriorityDao } from "src/app/data/dao/interface/priority-dao.interface";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { IPriority } from "src/app/shared/types/priority.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";

@Injectable({ providedIn: "root" })
export class PriorityDaoArray implements IPriorityDao {
  constructor(private localStorage: LocalStorageService) {}

  getAll(): Observable<IPriority[]> {
    let data: null | IPriority[] = this.localStorage.get(EStaticVariables.TOKEN_FOR_PRIORITY);
    console.log(data);

    if (data === null) {
      data = ApiData.priorities;
      this._set(data);
    }
    return of(data);
  }

  get(): Observable<IPriority> {
    return of();
  }

  post(): Observable<IPriority> {
    return of();
  }

  put(): Observable<IPriority> {
    return of();
  }

  delete(): Observable<IPriority[]> {
    return of();
  }

  private _set(array: IPriority[]) {
    this.localStorage.set(EStaticVariables.TOKEN_FOR_PRIORITY, array);
  }
}
