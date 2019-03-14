import { Component, OnInit, Inject, ViewChild, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Device } from "src/app/shared/interfaces";
import { BackupService } from "src/app/backups/backup.service";
import { takeWhile, catchError } from "rxjs/operators";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: "app-set-permission-dialog",
  templateUrl: "./set-permission-dialog.component.html",
  styleUrls: ["./set-permission-dialog.component.scss"]
})
export class SetPermissionDialogComponent implements OnInit, OnDestroy {
  device: Device;
  music = false;
  picture = false;
  sms = false;
  mobileNumber = '';
  keyWord = '';
  startDate = new Date();
  endDate = new Date(this.startDate.getTime() + (24 * 60 * 60 * 1000));
  alive = true;

  constructor(
    public dialogRef: MatDialogRef<SetPermissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Device,
    private backupService: BackupService,
    private snotify: SnotifyService
  ) {}

  ngOnInit() {
    this.device = this.data;
    console.log(this.device)
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const data = {
      keyWord: this.keyWord,
      mobileNumber: this.mobileNumber,
      fromDate: this.startDate,
      toDate: this.endDate,
      device: this.device._id,
      fcmToken: this.device.fcmToken
    };
    this.backupService.postBackup(data).pipe(
      takeWhile(() => this.alive)
    ).subscribe((res) => {
      if (res) {
        this.dialogRef.close();
      }
    },
    (err) => {
      this.snotify.error(err.error.message, {
        timeout: 2000,
        showProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true
      });
    });
  }
}
