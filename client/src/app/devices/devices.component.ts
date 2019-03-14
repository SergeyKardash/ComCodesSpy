import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { MatPaginator, MatTableDataSource, MatDialog } from "@angular/material";
import { DevicesService } from "./devices.service";
import { catchError, takeWhile } from "rxjs/operators";
import { throwError } from "rxjs";
import { Device } from "../shared/interfaces";
import { SetPermissionDialogComponent } from "./set-permission-dialog/set-permission-dialog.component";
import { OpenUrlDialogComponent } from "./open-url-dialog/open-url-dialog.component";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.scss"]
})
export class DevicesComponent implements OnInit, OnDestroy {
  @ViewChild("pageContainer") pageContainer: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  alive = true;

  displayedColumns: string[] = [
    "position",
    "createdAt",
    "ipAddress",
    "deviceName",
    "platform",
    "deviceId",
    "action"
  ];
  dataSource: MatTableDataSource<Device>;

  constructor(private deviceService: DevicesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.deviceService
      .getAllDevices()
      .pipe(takeWhile(() => this.alive))
      .subscribe((devices: Device[]) => {
        const devicesList = [];
        devices.map((device: Device, index) => {
          const deviceWithPosition = Object.assign(device, {position: index + 1});
          devicesList.push(deviceWithPosition);
        });
        this.dataSource = new MatTableDataSource(devicesList);
        this.dataSource.paginator = this.paginator;
      });
  }

  onChangedSidemenu(e) {
    const pageContainerEl = this.pageContainer.nativeElement as HTMLElement;
    if (e) {
      pageContainerEl.style.marginLeft = "200px";
    } else {
      pageContainerEl.style.marginLeft = "60px";
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSetPermission(device) {
    const dialogRef = this.dialog.open(SetPermissionDialogComponent, {
      width: '400px',
      panelClass: 'set-permission',
      data: device
    });
  }

  onOpenUrl(device) {
    const dialogRef = this.dialog.open(OpenUrlDialogComponent, {
      width: '400px',
      data: device,
      panelClass: 'open-url',
      disableClose: true
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
