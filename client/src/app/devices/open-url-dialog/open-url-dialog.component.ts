import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  OnDestroy
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Device } from "src/app/shared/interfaces";
import { BackupService } from "src/app/backups/backup.service";
import { takeWhile } from "rxjs/operators";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: "app-open-url-dialog",
  templateUrl: "./open-url-dialog.component.html",
  styleUrls: ["./open-url-dialog.component.scss"]
})
export class OpenUrlDialogComponent implements OnInit, OnDestroy {
  device: Device;
  alive = true;
  @ViewChild("url") url: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<OpenUrlDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private backupService: BackupService,
    private snotify: SnotifyService
  ) {}

  ngOnInit() {
    this.device = this.data;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onClose() {
    this.dialogRef.close();
  }

  onOpen() {
    const url = this.url.nativeElement.value;
    const data = {
      url,
      fcmToken: this.device.fcmToken
    };
    this.backupService
      .openUrl(data)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        res => {
          if (res) {
            this.dialogRef.close();
          }
        },
        err => {
          this.snotify.error(err.error.message, {
            timeout: 2000,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true
          });
        }
      );
  }
}
