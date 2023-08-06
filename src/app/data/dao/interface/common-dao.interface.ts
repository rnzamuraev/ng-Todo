import { Observable } from "rxjs";

export interface ICommonDao<T> {
  getAll(): Observable<T[]>;

  get(id: number): Observable<T>;

  post(obj: T): void;

  // put(obj: T): Observable<T[]>;
  put(obj: T): void;

  delete(obj: T): Observable<T[]>;
}
