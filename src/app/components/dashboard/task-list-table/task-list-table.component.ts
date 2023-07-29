import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

import { DataService } from "src/app/shared/services/data.service";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { ITask } from "src/app/shared/types/task.interface";

@Component({
  selector: "todo-task-list-table",
  templateUrl: "./task-list-table.component.html",
  styleUrls: ["./task-list-table.component.scss"],
})
export class TaskListTableComponent implements OnInit {
  public dataNameTasks: string[] = [
    "color",
    "index",
    "title",
    "category",
    "priority",
    "date-end",
    "status",
    "delete",
  ];
  // public myDataSource!: MatTableDataSource<ITask>;
  public myDataSource = new MatTableDataSource<ITask>();
  public tasks!: ITask[];
  // public isTaskCompleted = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // this.initializeDataSours();
    this.initializeData();
    // this.updateTodoTable(this.tasks);
  }

  private initializeData() {
    this.dataService
      .fetchData()
      // .pipe(next((this.tasks$ = data)))
      .subscribe(data => {
        this.tasks = data;

        this.updateTodoTable(data);
        console.log(
          data.map(i => {
            i.category?.name;
          })
        );
      });
  }

  // private initializeDataSours() {
  //   this.myDataSource = new MatTableDataSource();
  // }

  public setColorPriority(data: ITask): string {
    if (data.status) return EStaticVariables.TASK_COMPLETED_COLOR;

    if (data.priority?.color) return data.priority?.color;

    return EStaticVariables.TASK_WITHOUT_COLOR;
  }

  private updateTodoTable(data: ITask[]): void {
    this.myDataSource.data = data;
  }

  onToggleTaskCompleted(task: ITask) {
    task.status = !task.status;
  }
}
