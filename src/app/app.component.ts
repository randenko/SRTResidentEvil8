import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import {Subscription} from "rxjs";

import {SettingsDialogComponent} from "./settings/settings-dialog/settings-dialog.component";
import {SettingsService} from "./settings/settings.service";
import {Settings} from "./settings/settings.model";
import {SrtHostService} from "./game-host/srt-host.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title: String = 'RE 8 Village SRT UI';
  settings: Settings;
  private settingsSubscription: Subscription;
  private srtHostSubscription: Subscription;
  private dataPollingInterval;

  constructor(private dialog: MatDialog, private settingsService: SettingsService, private srtHostService: SrtHostService) {
  }

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.getSettings().subscribe({
      next: value => this.settings = value
    });
    this.setPollingInterval();
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
    this.clearPollingInterval();
  }

  fetchData() {
    this.srtHostSubscription = this.srtHostService.fetchData().subscribe(data => {
      console.log(data);
    });
  }

  setPollingInterval() {
    this.fetchData(); // pre-fetch so we don't have to wait for the interval.
    this.dataPollingInterval = setInterval(() => {
      this.fetchData();
    }, this.settings.pollingRate);
  }

  clearPollingInterval() {
    this.srtHostSubscription.unsubscribe();
    if (this.dataPollingInterval) {
      clearInterval(this.dataPollingInterval);
    }
  }

  openSettingsDialog(): void {
    const dialogConfig = this.setupDialogConfig();
    const dialogRef = this.dialog.open(SettingsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((newSettings: Settings) => {
      if (newSettings) {
        const previousSettings = this.settings;
        this.settingsService.setSettings(newSettings);
        if (newSettings.pollingRate !== previousSettings.pollingRate ||
          newSettings.srtHostAddress !== previousSettings.srtHostAddress ||
          newSettings.srtHostPort !== previousSettings.srtHostPort) {
          this.clearPollingInterval();
          this.setPollingInterval();
        }
      }
    });
  }

  private setupDialogConfig(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.settings;
    dialogConfig.width = '350px';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      'top': '64px',
      right: '0'
    };
    return dialogConfig;
  }
}
