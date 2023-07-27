import { Component, OnInit } from "@angular/core";

import { DataService } from "src/app/shared/services/data.service";
import { ITask } from "../../../shared/types/task.interface";

@Component({
  selector: "todo-task-list-table",
  templateUrl: "./task-list-table.component.html",
  styleUrls: ["./task-list-table.component.scss"],
})
export class TaskListTableComponent implements OnInit {
  public tasks: ITask[] = [];
  public isTaskCompleted = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    this.dataService
      .fetchData()
      // .pipe(next((this.tasks$ = data)))
      .subscribe(data => {
        this.tasks = data;
        console.log(
          data.map(i => {
            i.category?.name;
          })
        );
      });
  }

  // subscribe;
}
