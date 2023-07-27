import { NgModule } from "@angular/core";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MaterialUiModule } from "./material-ui/material-ui.module";

@NgModule({
  exports: [ComponentsModule, MaterialUiModule],
})
export class SharedModule {}
