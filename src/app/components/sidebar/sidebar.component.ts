import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";

import { DataService } from "src/app/shared/services/data.service";
import { SidebarService } from "./services/sidebar.service";

@Component({
  selector: "todo-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public isActive = true;
  public categories!: string[];
  public categoryTask!: string;

  constructor(private dataService: DataService, private sidebarService: SidebarService) {}

  ngOnInit() {
    this.initializeCategory();
    this.initializeCategoryTask();
  }

  private initializeCategory(): void {
    this.dataService.getCategories().subscribe(category => {
      console.log(category);

      this.categories = category.map(category => {
        console.log(category);
        return category.name;
      });
    });
  }
  private initializeCategoryTask(): void {
    this.sidebarService.getCategoryTask$.subscribe(category => {
      console.log(category);
      this.categoryTask = category;
    });
  }

  public onGetTaskByCategory(category: string) {
    this.sidebarService.setCategoryTask$(category);
    this.dataService.fetchData().pipe(
      map(tasks => {
        return this.dataService.filterByCategory(tasks, category);
      })
      // tap(tasks => )
    );
  }
}
