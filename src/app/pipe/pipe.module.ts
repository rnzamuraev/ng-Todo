import { NgModule } from "@angular/core";
import { TasksFilterPipe } from "./tasks-filter.pipe";

@NgModule({
  declarations: [TasksFilterPipe],
  exports: [TasksFilterPipe],
})
export class PipeModule {}
