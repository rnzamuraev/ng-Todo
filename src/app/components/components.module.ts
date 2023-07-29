import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { SharedModule } from "src/app/shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TaskListTableComponent } from "./dashboard/task-list-table/task-list-table.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TaskComponent } from "./dashboard/task-list-table/task/task.component";
import { InfoPanelComponent } from "./dashboard/info-dashboard/info-dashboard.component";

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    TaskListTableComponent,
    TaskComponent,
    InfoPanelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    TaskListTableComponent,
  ],
})
export class ComponentsModule {}
