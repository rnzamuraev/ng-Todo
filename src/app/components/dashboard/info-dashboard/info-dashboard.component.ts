import { Component, Input } from "@angular/core";

@Component({
  selector: "todo-info-dashboard",
  templateUrl: "./info-dashboard.component.html",
  styleUrls: ["./info-dashboard.component.scss"],
})
export class InfoPanelComponent {
  @Input()
  public totalCountTasksProps!: number;

  @Input()
  public totalCountCompletedTasksProps!: number;

  @Input()
  public totalCountUncompletedTasksProps!: number;
}
