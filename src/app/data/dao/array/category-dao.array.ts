import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { ApiData } from "src/app/data/api.data";
import { ICategoryDao } from "src/app/data/dao/interface/category-dao.interface";
import { ICategory } from "src/app/shared/types/category.interface";

@Injectable({ providedIn: "root" })
export class CategoryDaoArray implements ICategoryDao {
  search(): Observable<ICategory> {
    throw of();
  }

  getAll(): Observable<ICategory[]> {
    return of(ApiData.categories);
  }

  get(): Observable<ICategory> {
    return of();
  }

  add(): Observable<ICategory> {
    return of();
  }

  update(): Observable<ICategory> {
    return of();
  }

  delete(): Observable<ICategory> {
    return of();
  }
}
