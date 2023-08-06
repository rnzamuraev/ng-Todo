import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { IDialogData } from "src/app/components/dialog/types/dialog.interface";
import { ICategory } from "src/app/shared/types/category.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";

@Component({
  selector: "todo-dialog-edit-category",
  templateUrl: "./dialog-edit-category.component.html",
  styleUrls: ["./dialog-edit-category.component.scss"],
})
export class DialogEditCategoryComponent implements OnInit {
  public addCategory = EStaticVariables.ADD_CATEGORY;
  public editTitle = "";
  public category!: ICategory;
  public categoryTitle!: string;

  constructor(
    private dialogRef: MatDialogRef<DialogEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData // private stateService: StateService,
  ) // private dataService: DataService,
  // private dialog: MatDialog
  {}

  ngOnInit(): void {
    this.initializeEditTask();
  }

  private initializeEditTask(): void {
    this.editTitle = this.data.title;
    this.category = this.data.category;
    this.categoryTitle = this.data.category.name;
  }

  public onConfirmCategory(): void {
    this.category.name = this.categoryTitle;

    console.log(this.category);
    this.dialogRef.close({ category: this.category, title: this.data.title });
  }

  public onDeleteCategory(): void {
    this.dialogRef.close({ category: this.category, title: EStaticVariables.DELETE_CATEGORY });
  }

  public onCancel(): void {
    this.dialogRef.close(this.data.title);
  }
}
