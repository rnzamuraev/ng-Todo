import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

// import { DataService } from "src/app/shared/services/data.service";
import { DialogEditTaskComponent } from "src/app/components/dialog/dialog-edit-task/dialog-edit-task.component";
// import { StateService } from "src/app/components/state.service";
import { DialogDeleteTaskComponent } from "src/app/components/dialog/dialog-delete-task/dialog-delete-task.component";
import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { ITask } from "src/app/shared/types/task.interface";

@Component({
  selector: "todo-task-list-table",
  templateUrl: "./task-list-table.component.html",
  styleUrls: ["./task-list-table.component.scss"],
})
export class TaskListTableComponent implements OnInit, AfterViewInit {
  // ** MatTable Start **/
  public dataNameTasks: string[] = [
    "color",
    "index",
    "title",
    "category",
    "priority",
    "status",
    "edit",
    "delete",
  ];
  public myDataSource = new MatTableDataSource<ITask>();

  @ViewChild(MatSort)
  private sort!: MatSort;

  @ViewChild(MatPaginator)
  private paginator!: MatPaginator;
  // ** MatTable end **/

  // ** Params **/
  public tasksProps!: ITask[];

  @Input()
  public categoriesProps!: ICategory[];

  @Input()
  public prioritiesProps!: IPriority[];

  @Output()
  public newTask = new EventEmitter<{ key: string; task: ITask }>();

  @Input("tasksProps")
  public set setTasksProps(props: ITask[]) {
    this.tasksProps = props;
    this.updateTodoTable(props);
  }

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.addTableBehavior();
  }

  private updateTodoTable(data: ITask[]): void {
    if (!this.myDataSource) return;

    this.myDataSource.data = data;

    this.addTableBehavior();

    this.dataSortAccessor();
  }

  private addTableBehavior(): void {
    this.myDataSource.sort = this.sort;
    this.myDataSource.paginator = this.paginator;
  }

  private dataSortAccessor(): void {
    this.myDataSource.sortingDataAccessor = (task, colName): string | number => {
      switch (colName) {
        case "category":
          return task.category ? `${task.category.name}` : "";
        case "priority":
          return task.priority ? task.priority.id : "";
        default:
          return task.name.toLowerCase();
      }
    };
  }

  public setColorPriority(data: ITask): string {
    if (data.status) return EStaticVariables.TASK_COMPLETED_COLOR;

    if (data.priority?.color) return data.priority.color;

    return EStaticVariables.TASK_WITHOUT_COLOR;
  }

  public onOpenDialogAdd(): void {
    const task: ITask = {
      id: 0,
      name: "",
      category: null,
      priority: null,
      date: null,
      status: false,
    };

    const dialogRef = this.dialog.open(DialogEditTaskComponent, {
      data: {
        task,
        categories: this.categoriesProps,
        priorities: this.prioritiesProps,
        title: EStaticVariables.ADD_TASK,
      },
      autoFocus: false,
    });

    this.dialogClose(dialogRef, task);
  }

  public onOpenDialogEdit(task: ITask): void {
    console.log(this.prioritiesProps);
    const dialogRef = this.dialog.open(DialogEditTaskComponent, {
      data: {
        task,
        categories: this.categoriesProps,
        priorities: this.prioritiesProps,
        title: EStaticVariables.EDIT_TASK,
      },
      autoFocus: false,
    });

    this.dialogClose(dialogRef, task);
  }

  public onOpenDialogDelete(task: ITask) {
    const dialogRef = this.dialog.open(DialogDeleteTaskComponent, {
      data: {
        task,
        title: EStaticVariables.DELETE_TASK,
        message: "Are you sure you want to delete this task?",
      },
      autoFocus: false,
    });

    this.dialogClose(dialogRef, task);
  }

  private dialogClose(dialogRef: MatDialogRef<any, any>, task: ITask) {
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result.title === EStaticVariables.ADD_TASK) {
        console.log("add: ", task);

        this.addTask(result.task);
      }

      if (result.title === EStaticVariables.DELETE_TASK) {
        console.log("delete: ", task);

        this.deleteTask(result.task);
      }

      if (result.title === EStaticVariables.EDIT_TASK) {
        console.log("edit: ", result.task);

        this.editTask(result.task);
      }
    });
  }

  public addTask(task: ITask): void {
    this.newTask.emit({ key: EStaticVariables.ADD_TASK, task });
  }
  private editTask(task: ITask): void {
    this.newTask.emit({ key: EStaticVariables.EDIT_TASK, task });
  }
  private deleteTask(task: ITask): void {
    this.newTask.emit({ key: EStaticVariables.DELETE_TASK, task });
  }
  public onToggleTaskCompleted(task: ITask): void {
    task.status = !task.status;

    this.newTask.emit({ key: EStaticVariables.COMPLETED_TASK, task });
  }
}
