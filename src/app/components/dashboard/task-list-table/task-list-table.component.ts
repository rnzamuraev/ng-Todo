import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { DataService } from "src/app/shared/services/data.service";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { ITask } from "src/app/shared/types/task.interface";

@Component({
  selector: "todo-task-list-table",
  templateUrl: "./task-list-table.component.html",
  styleUrls: ["./task-list-table.component.scss"],
})
export class TaskListTableComponent implements OnInit, AfterViewInit {
  public dataNameTasks: string[] = [
    "color",
    "index",
    "title",
    "category",
    "priority",
    "date-end",
    "edit",
    "status",
    "delete",
  ];
  // public myDataSource!: MatTableDataSource<ITask>;
  public myDataSource = new MatTableDataSource<ITask>();
  public tasks!: ITask[];
  // public isTaskCompleted = false;

  @ViewChild(MatSort)
  private sort!: MatSort;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.initializeDataSours();
    this.initializeData();
    // this.updateTodoTable(this.tasks);
  }

  ngAfterViewInit() {
    this.addTableBehavior();
  }

  private initializeData(): void {
    this.dataService
      .getAllTasks()
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

  private updateTodoTable(data: ITask[]): void {
    this.myDataSource.data = data;

    this.addTableBehavior();

    this.dataSortAccessor();
  }

  private addTableBehavior(): void {
    this.myDataSource.sort = this.sort;
    this.myDataSource.paginator = this.paginator;
  }

  private dataSortAccessor(): void {
    this.myDataSource.sortingDataAccessor = (task, colName): string => {
      switch (colName) {
        case "date-end":
          return task.date ? `${task.date}` : "";
        default:
          return task.name.toLowerCase();
      }
    };
  }

  public setColorPriority(data: ITask): string {
    if (data.status) return EStaticVariables.TASK_COMPLETED_COLOR;

    if (data.priority?.color) return data.priority?.color;

    return EStaticVariables.TASK_WITHOUT_COLOR;
  }

  public onToggleTaskCompleted(task: ITask): void {
    task.status = !task.status;
  }
}
