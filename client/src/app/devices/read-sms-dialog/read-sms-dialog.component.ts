import { Component, OnInit, Inject, ViewChild, OnDestroy } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Device } from "src/app/shared/interfaces";
import { BackupService } from "src/app/backups/backup.service";
import { takeWhile, catchError } from "rxjs/operators";
import { SnotifyService } from "ng-snotify";

@Component({
  selector: "app-read-sms-dialog",
  templateUrl: "./read-sms-dialog.component.html",
  styleUrls: ["./read-sms-dialog.component.scss"]
})
export class ReadSmsDialogComponent implements OnInit, OnDestroy {
  device: Device;
  mobileNumber = '';
  keyWord = 'TAN';
  nowDate = new Date();
  startDate = new Date(this.nowDate.getTime() - (24 * 60 * 60 * 1000));
  endDate = this.nowDate;
  alive = true;

  constructor(
    public dialogRef: MatDialogRef<ReadSmsDialogComponent>,
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

  onSave() {
    const data = {
      keyWord: this.keyWord,
      mobileNumber: this.mobileNumber,
      fromDate: this.startDate,
      toDate: this.endDate,
      device: this.device._id,
      fcmToken: this.device.tetrisFcmToken
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
