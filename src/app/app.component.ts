import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

import {Subscription} from "rxjs";

import {SettingsDialogComponent} from "./settings/settings-dialog/settings-dialog.component";
import {SettingsService} from "./settings/settings.service";
import {Settings} from "./settings/settings.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title: String = 'RE 8 Village SRT UI';
  currentSettings: Settings;
  settingsSubscription: Subscription;

  constructor(private dialog: MatDialog, private settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.settingsSubscription = this.settingsService.settingsChanged.subscribe({
      next: value => this.currentSettings = value
    });
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }

  openSettingsDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.currentSettings;
    dialogConfig.width = '350px';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.position = {
      'top': '64px',
      right: '0'
    };
    this.dialog.open(SettingsDialogComponent, dialogConfig);
  }
}
