import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { DialogEditTaskComponent } from "src/app/components/dialog/dialog-edit-task/dialog-edit-task.component";
import { IDialogData } from "src/app/components/dialog/types/dialog.interface";

@Component({
  selector: "todo-dialog-delete-task",
  templateUrl: "./dialog-delete-task.component.html",
  styleUrls: ["./dialog-delete-task.component.scss"],
})
export class DialogDeleteTaskComponent implements OnInit {
  public title!: string;
  public message!: string;

  constructor(
    private dialogRef: MatDialogRef<DialogEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IDialogData
  ) {}

  ngOnInit(): void {
    this.initializeDelDialog();
  }

  private initializeDelDialog() {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  public onDeleteTask(): void {
    if (this.data.task) {
      this.dialogRef.close({ task: this.data.task, title: EStaticVariables.DELETE_TASK });
    }

    if (this.data.category)
      this.dialogRef.close({
        category: this.data.category,
        title: EStaticVariables.DELETE_CATEGORY,
      });
  }

  public onCancel(): void {
    this.dialogRef.close(this.data.title);
  }
}
