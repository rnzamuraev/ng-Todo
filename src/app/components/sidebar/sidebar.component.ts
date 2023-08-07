import { Component, OnInit } from "@angular/core";

import { DataService } from "src/app/shared/services/data.service";
// import { SidebarService } from "../../shared/services/sidebar.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { map } from "rxjs";
import { StateService } from "src/app/components/state.service";
import { ICategory } from "src/app/shared/types/category.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { ITask } from "src/app/shared/types/task.interface";
import { DialogEditCategoryComponent } from "../dialog/dialog-edit-category/dialog-edit-category.component";

@Component({
  selector: "todo-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public categories!: ICategory[];
  public categoryNameAll: string = EStaticVariables.INITIAL_ACTIVE_CATEGORY;
  public activeCategoryName = this.categoryNameAll;
  public activeCategory!: ICategory | null;
  public showBtnEdit: number | null = null;

  constructor(
    private dataService: DataService,
    private stateService: StateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initializeAllCategories$();
    this.setActiveTaskCategory$();
  }

  private initializeAllCategories$(): void {
    this.dataService.getAllCategories().subscribe(category => {
      this.stateService.setCategories$(category);
    });
    this.stateService.getCategories$.subscribe(category => {
      console.log(category);
      this.categories = category;
    });
  }

  private setActiveTaskCategory$(): void {
    this.stateService.getActiveTaskCategory$.subscribe(category => {
      this.activeCategory = category;
    });
  }

  public onShowBtnEdit(value: number | null) {
    this.showBtnEdit = value;
  }

  public onGetTaskByCategory(categoryName: string, category: ICategory | null) {
    if (this.activeCategoryName === categoryName) return;

    this.activeCategoryName = categoryName;
    this.stateService.setActiveTaskCategory$(category);

    this.dataService.getAllTasks().subscribe(tasks => {
      this.stateService.setTasks$(tasks, "", category, null, null);
    });
  }

  public onOpenDialogAddCategory(): void {
    const category: ICategory = { id: 0, name: "" };

    const dialogRef = this.dialog.open(DialogEditCategoryComponent, {
      data: {
        category,
        title: EStaticVariables.ADD_CATEGORY,
      },
      autoFocus: false,
    });

    this.closeDialogCategory(dialogRef);
  }

  public onOpenDialogEditCategory(category: ICategory): void {
    const dialogRef = this.dialog.open(DialogEditCategoryComponent, {
      data: {
        category,
        title: EStaticVariables.EDIT_CATEGORY,
      },
      autoFocus: false,
    });

    this.closeDialogCategory(dialogRef);
  }

  private closeDialogCategory(dialogRef: MatDialogRef<DialogEditCategoryComponent, any>) {
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result.title === EStaticVariables.ADD_CATEGORY) {
        console.log("edit: ", result);

        this.addCategory(result.category);
      }

      if (result.title === EStaticVariables.EDIT_CATEGORY) {
        console.log("edit: ", result);

        this.updateTasks(result.category, result.title);
        this.activeCategoryName = result.category.name;
        this.updateCategories(result.category);
      }

      if (result.title === EStaticVariables.DELETE_CATEGORY) {
        console.log("delete: ", result);

        this.stateService.setActiveTaskCategory$(null);
        this.updateTasks(result.category, result.title);
        this.activeCategoryName = this.categoryNameAll;
        this.deleteCategory(result.category);
      }
    });
  }

  private updateTasks(category: ICategory, value: string): void {
    this.dataService
      .getAllTasks()
      .pipe(
        map((tasks: ITask[]) => {
          return tasks.map(task => {
            if (task.category && task.category.id == category.id) {
              if (value === EStaticVariables.EDIT_CATEGORY) {
                task.category = category;
                this.dataService.updateTask(task).subscribe();
                this.activeCategoryName = category.name;
              } else {
                task.category = null;
                this.activeCategoryName = this.categoryNameAll;
                this.dataService.updateTask(task).subscribe();
                this.stateService.setActiveTaskCategory$(null);
              }
              return task;
            }
            return task;
          });
        })
      )
      .subscribe(tasks => {
        console.log("updateTasks: ", tasks);
        this.stateService.setTasks$(tasks, "", this.activeCategory, null, null);
      });
  }

  private addCategory(category: ICategory): void {
    this.dataService.addCategory(category).subscribe(categories => {
      this.stateService.setCategories$(categories);
    });
  }
  private updateCategories(category: ICategory): void {
    this.dataService.updateCategory(category).subscribe(categories => {
      this.stateService.setCategories$(categories);
    });
  }
  private deleteCategory(category: ICategory): void {
    this.dataService.deleteCategory(category).subscribe(categories => {
      this.stateService.setCategories$(categories);
    });
  }
}
