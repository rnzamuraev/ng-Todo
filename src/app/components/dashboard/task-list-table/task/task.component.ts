import { Component, Input } from "@angular/core";

import { ITask } from "src/app/shared/types/task.interface";

@Component({
  selector: "todo-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"],
})
export class TaskComponent {
  @Input("task")
  public taskProps!: ITask;
  @Input("index")
  public indexProps!: number;

  public isChecked: boolean = this.taskProps.status;

  constructor() {}

  onChangeChecked() {
    this.isChecked = !this.isChecked;
  }
}
