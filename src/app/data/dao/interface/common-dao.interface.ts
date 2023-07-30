import { Observable } from "rxjs";

export interface ICommonDao<T> {
  getAll(): Observable<T[]>;

  get(id: number): Observable<T>;

  add(obj: T): Observable<T>;

  update(obj: T): Observable<T>;

  delete(id: number): Observable<T>;
}
