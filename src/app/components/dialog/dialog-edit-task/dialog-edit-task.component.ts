import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { IDialogData } from "src/app/components/dialog/types/dialog.interface";
import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { ITask } from "src/app/shared/types/task.interface";

@Component({
  selector: "todo-dialog-edit-task",
  templateUrl: "./dialog-edit-task.component.html",
  styleUrls: ["./dialog-edit-task.component.scss"],
})
export class DialogEditTaskComponent implements OnInit {
  public editTask = "";
  public task!: ITask;
  public taskTitle!: string;
  public category!: ICategory;
  public priority!: IPriority;
  public categories!: ICategory[];
  public priorities!: IPriority[];

  constructor(
    private dialogRef: MatDialogRef<DialogEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData // private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.initializeEditTask();
  }

  private initializeEditTask(): void {
    this.editTask = this.data.title;
    this.task = this.data.task;
    this.taskTitle = this.data.task.name;
    this.categories = this.data.categories;
    this.priorities = this.data.priorities;
  }

  private changeTaskParams(task: ITask): void {
    console.log(this.category);
    console.log(this.priority);

    if (this.category) {
      task.category = this.category;
    } else {
      task.category = null;
    }

    if (this.priority) {
      task.priority = this.priority;
    } else {
      task.priority = null;
    }

    task.name = this.taskTitle;
  }

  public onConfirmTaskEditing(): void {
    this.changeTaskParams(this.task);

    console.log(this.task);
    this.dialogRef.close({ task: this.task, title: this.data.title });
  }

  public onCancel(): void {
    this.dialogRef.close(this.data.title);
  }
}
