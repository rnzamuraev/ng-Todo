import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  private categoryTask$ = new BehaviorSubject<string>(EStaticVariables.INITIAL_CATEGORY_TASK);

  constructor() {}

  // *** categoryTask ***//
  public get getCategoryTask$(): Observable<string> {
    return this.categoryTask$.asObservable();
  }
  public setCategoryTask$(data: string): void {
    this.categoryTask$.next(data);
  }
}
