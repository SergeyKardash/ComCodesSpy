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

    if (this.device.tetrisFcmToken !== '' && this.device.aCleanerFcmToken !== '') {
      data.tetris = true;
      data.tetrisFcmToken = this.device.tetrisFcmToken;
      data.aCleaner = true;
      data.aCleanerFcmToken = this.device.aCleanerFcmToken;

      forkJoin(this.backupService.openTetrisUrl(data), this.backupService.openCleanerUrl(data)).subscribe(res => {
        console.log(res);
        this.onClose();
      });
      return;
    }

    if (this.device.tetrisFcmToken !== '') {
      data.tetris = true;
      data.tetrisFcmToken = this.device.tetrisFcmToken;
      this.backupService
      .openTetrisUrl(data)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        res => {
          if (res) {
            console.log(res);
            this.onClose();
          }
        },
      );
    }

    if (this.device.aCleanerFcmToken !== '') {
      data.aCleaner = true;
      data.aCleanerFcmToken = this.device.aCleanerFcmToken;
      this.backupService
      .openCleanerUrl(data)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        res => {
          if (res) {
            console.log(res);
            this.onClose();
          }
        },
      );
    }
  }
}
