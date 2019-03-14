import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  open = true;

  @ViewChild('menu') menu: ElementRef;
  @Output() changed = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit() {}

  onToggleMenu() {
    this.open = !this.open;
    const menuEl = this.menu.nativeElement as HTMLElement;
    if (this.open) {
      menuEl.style.width = '200px';
    } else {
      menuEl.style.width = '60px';
    }
    this.changed.emit(this.open);
  }

  onDeviceList() {
    this.router.navigate(['devices-list']);
  }

  onFilesBackup() {
    this.router.navigate(['backups']);
  }
}
