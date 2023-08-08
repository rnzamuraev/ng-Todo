import { Component, OnInit } from "@angular/core";
import { zip } from "rxjs";
import { StateService } from "src/app/components/state.service";
import { DataService } from "src/app/shared/services/data.service";
import { ICategory } from "src/app/shared/types/category.interface";
import { IPriority } from "src/app/shared/types/priority.interface";
import { EStaticVariables } from "src/app/shared/types/staticVariable.enum";
import { ITask } from "src/app/shared/types/task.interface";

@Component({
  selector: "todo-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public tasks!: ITask[];
  public categories!: ICategory[];
  public priorities!: IPriority[];
  public activeCategory!: ICategory | null;
  public searchText: string = "";
  public priority: IPriority | null = null;
  public status: boolean | null = null;

  constructor(private dataService: DataService, private stateService: StateService) {}

  ngOnInit() {
    this.initializeTasksParams();
    this.getTasks$();
    this.getCategories$();
    this.getPriorities$();
    this.getActiveCategory$();
  }

  private initializeTasksParams(): void {
    zip(
      this.dataService.getAllTasks(),
      this.dataService.getAllCategories(),
      this.dataService.getAllPriorities()
    ).subscribe(array => {
      this.stateService.setTasks$(array[0], "", null, null, null);
      this.stateService.setCategories$(array[1]);
      this.stateService.setPriorities$(array[2]);
    });
  }

  private getTasks$(): void {
    this.stateService.getTasks$.subscribe(data => {
      this.tasks = data;
    });
  }

  private getCategories$(): void {
    this.stateService.getCategories$.subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }

  private getPriorities$(): void {
    this.stateService.getPriorities$.subscribe(data => {
      console.log(data);
      this.priorities = data;
    });
  }

  private getActiveCategory$(): void {
    this.stateService.getActiveTaskCategory$.subscribe(category => {
      this.activeCategory = category;
    });
  }

  public getUpdateTasksProps(props: { key: string; task: ITask }) {
    console.log(props);
    if (props.key === EStaticVariables.ADD_TASK) {
      this.addTask(props.task);
    } else if (props.key === EStaticVariables.DELETE_TASK) {
      this.deleteTask(props.task);
    } else {
      this.updateTask(props.task);
    }
  }

  private addTask(task: ITask) {
    this.dataService.addTask(task).subscribe(tasks => {
      this.stateService.setTasks$(tasks, "", this.activeCategory, null, null);
    });
  }

  private updateTask(task: ITask) {
    this.dataService.updateTask(task).subscribe(tasks => {
      this.stateService.setTasks$(tasks, "", this.activeCategory, null, null);
    });
  }

  private deleteTask(task: ITask) {
    this.dataService.deleteTask(task).subscribe(tasks => {
      this.stateService.setTasks$(tasks, "", this.activeCategory, null, null);
    });
  }

  public getSearchTextProps(props: string) {
    console.log(props);
    this.searchText = props;
  }

  public getPriorityProps(props: IPriority | null) {
    console.log(props);
    this.priority = props;
  }

  public getStatusProps(props: boolean | null) {
    console.log(props);
    this.status = props;
  }
}
