import { Component, OnInit } from "@angular/core";

@Component({
  selector: "todo-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  private sidebarOpen() {}

  private sidebarClose() {}

  public onSidebarToggle() {}
}
