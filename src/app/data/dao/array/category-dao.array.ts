import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";

import { ApiData } from "src/app/data/api.data";
import { ICategoryDao } from "src/app/data/dao/interface/category-dao.interface";
import { LocalStorageService } from "src/app/shared/services/local-storage.service";
import { ICategory } from "src/app/shared/types/category.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";

@Injectable({ providedIn: "root" })
export class CategoryDaoArray implements ICategoryDao {
  constructor(private localStorage: LocalStorageService) {}

  search(): Observable<ICategory> {
    throw of();
  }

  getAll(): Observable<ICategory[]> {
    let data: null | ICategory[] = this.localStorage.get(EStaticVariables.TOKEN_FOR_CATEGORY);
    console.log(data);

    if (data === null) {
      data = ApiData.categories;
      this._set(data);
    }

    return of(data);
  }

  get(): Observable<ICategory> {
    return of();
  }

  post(obj: ICategory): Observable<ICategory[]> {
    return this.getAll().pipe(
      map(categories => {
        let id = 1;
        const arrId = categories.map(category => category.id);

        if (arrId.length !== 0) id = Math.max(...arrId) + 1;

        obj.id = id;
        const category: ICategory[] = [...categories, obj];

        this._set(category);
        return category;
      })
    );
  }

  put(obj: ICategory): Observable<ICategory[]> {
    return this.getAll().pipe(
      map(categories => {
        const ind = categories.findIndex(category => category.id === obj.id);
        categories.splice(ind, 1, obj);

        this._set(categories);
        return categories;
      })
    );
  }

  delete(obj: ICategory): Observable<ICategory[]> {
    console.log(obj);
    return this.getAll().pipe(
      map(categories => {
        const newCategories = categories.filter(category => category.id !== obj.id);
        console.log(newCategories);

        this._set(newCategories);
        return newCategories;
      })
    );
  }

  private _set(array: ICategory[]) {
    this.localStorage.set(EStaticVariables.TOKEN_FOR_CATEGORY, array);
  }
}
