import { Component, Input } from "@angular/core";

@Component({
  selector: "todo-info-card",
  templateUrl: "./info-card.component.html",
  styleUrls: ["./info-card.component.scss"],
})
export class InfoCardComponent {
  @Input()
  public iconProps!: string;

  @Input()
  public textProps!: string;

  @Input()
  public totalCountTasksProps!: number;

  @Input()
  public totalCountStatusTasksProps!: number;

  @Input()
  public totalCountStatusPercentTasksProps!: string | null;

  @Input()
  public isCompletedProps!: boolean;
}
