import { Component, OnInit } from "@angular/core";
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
  private activeCategory!: ICategory | null;

  constructor(private dataService: DataService, private stateService: StateService) {}

  ngOnInit() {
    this.initializeTasks();
    this.initializeCategories$();
    this.initializePriorities$();
    this.getActiveCategory$();
  }

  private initializeTasks(): void {
    this.dataService.getAllTasks().subscribe(data => {
      this.stateService.setTasks$(data, "", null, null, null);
    });
    this.stateService.getTasks$.subscribe(data => {
      this.tasks = data;
    });
  }

  private initializeCategories$(): void {
    this.dataService.getAllCategories().subscribe(category => {
      this.stateService.setCategories$(category);
    });
    this.stateService.getCategories$.subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }

  private initializePriorities$(): void {
    this.dataService.getAllPriorities().subscribe(priority => {
      this.stateService.setPriorities$(priority);
    });
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
}
