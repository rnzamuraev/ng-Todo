import { NgModule } from "@angular/core";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MaterialUiModule } from "./material-ui/material-ui.module";
import { PipeModule } from "src/app/pipe/pipe.module";

@NgModule({
  exports: [ComponentsModule, MaterialUiModule, PipeModule],
})
export class SharedModule {}
