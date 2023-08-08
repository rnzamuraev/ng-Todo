import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatSelect } from "@angular/material/select";
import { IPriority } from "src/app/shared/types/priority.interface";

@Component({
  selector: "todo-task-filter",
  templateUrl: "./task-filter.component.html",
  styleUrls: ["./task-filter.component.scss"],
})
export class TaskFilterComponent {
  @Input()
  public prioritiesProps!: IPriority[];

  @Output()
  public searchText = new EventEmitter<string>();

  @Output()
  public priority = new EventEmitter<IPriority | null>();

  @Output()
  public status = new EventEmitter<boolean | null>();

  public onSearch(value: string) {
    this.searchText.emit(value);
  }

  public onGetPriority(value: IPriority | null) {
    this.priority.emit(value);
  }

  public onGetStatus(value: boolean | null) {
    this.status.emit(value);
  }

  public onClearText(search: HTMLInputElement) {
    this.onSearch("");
    search.value = "";
  }

  public onClearAll(search: HTMLInputElement, priority: MatSelect, status: MatSelect) {
    priority.value = null;
    status.value = null;
    this.onClearText(search);
    this.priority.emit(null);
    this.status.emit(null);
  }
}
