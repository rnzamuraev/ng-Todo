import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { InfoPanelComponent } from "src/app/components/dashboard/info-dashboard/info-dashboard.component";
import { TaskListTableComponent } from "src/app/components/dashboard/task-list-table/task-list-table.component";
import { DialogEditTaskComponent } from "src/app/components/dialog/dialog-edit-task/dialog-edit-task.component";
import { FooterComponent } from "src/app/components/footer/footer.component";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { SidebarComponent } from "src/app/components/sidebar/sidebar.component";
import { SharedModule } from "src/app/shared/shared.module";
import { DialogDeleteComponent } from "./dialog/dialog-delete/dialog-delete.component";
import { DialogEditCategoryComponent } from "./dialog/dialog-edit-category/dialog-edit-category.component";

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    TaskListTableComponent,
    InfoPanelComponent,
    DialogEditTaskComponent,
    DialogDeleteComponent,
    DialogEditCategoryComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    TaskListTableComponent,
    DialogEditTaskComponent,
  ],
})
export class ComponentsModule {}
