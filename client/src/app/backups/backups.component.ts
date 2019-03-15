import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { BackupService } from "./backup.service";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "app-backups",
  templateUrl: "./backups.component.html",
  styleUrls: ["./backups.component.scss"]
})
export class BackupsComponent implements OnInit, OnDestroy {
  @ViewChild("pageContainer") pageContainer: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  alive = true;

  displayedColumns: string[] = [
    "position",
    "createdAt",
    "deviceId",
    "deviceName",
    "keyWord",
    "mobileNumber",
    "fromDate",
    "toDate"
  ];

  dataSource: MatTableDataSource<any>;

  constructor(private backupService: BackupService) {}

  ngOnInit() {
    this.backupService
      .getAllBackups()
      .pipe(takeWhile(() => this.alive))
      .subscribe((res) => {
        let backupsList = [];
        res.forEach((backup, index) => {
          if (backup.device) {
            const backupResult = Object.assign(backup, {
              position: index + 1,
              deviceId: backup.device.deviceId,
              deviceName: backup.device.deviceName
            });
            const { device, ...backupResultEl } = backupResult;
            backupsList = [...backupsList, backupResultEl];
            console.log(backupsList)
          }
        });
        this.dataSource = new MatTableDataSource(backupsList);
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

  ngOnDestroy() {
    this.alive = false;
  }
}
