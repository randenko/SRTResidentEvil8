import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";

import {Subscription} from "rxjs";

import {SettingsDialogComponent} from "./settings/settings-dialog/settings-dialog.component";
import {SettingsService} from "./settings/settings.service";
import {Settings} from "./settings/settings.model";
import {SrtHostService} from "./game-host/srt-host.service";
import {ConnectionStatus} from "./game-host/game-model/connection-status-model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title: String = 'RE 8 Village SRT UI';
  settings: Settings;
  connectionStatus: ConnectionStatus;
  private settingsSubscription: Subscription;
  private connectionStatusSubscription: Subscription;
  private snackBarConnectionSuccessRef: MatSnackBarRef<TextOnlySnackBar>;
  private snackBarConnectionErrorRef: MatSnackBarRef<TextOnlySnackBar>;

  constructor(private _dialog: MatDialog, private _snackBar: MatSnackBar, private _settingsService: SettingsService,
              private _srtHostService: SrtHostService) {
  }

  ngOnInit(): void {
    this.settingsSubscription = this._settingsService.getSettings().subscribe(value => this.settings = value);
    this.connectionStatusSubscription = this._srtHostService.getConnectionStatus().subscribe(value => {
      this.connectionStatus = value;
      if (this.connectionStatus.isConnectionSuccess && !this.snackBarConnectionSuccessRef) {
        this.snackBarConnectionSuccessRef = this._snackBar.open('Connection established!', "Dismiss", {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.snackBarConnectionSuccessRef.afterDismissed().subscribe(() => this.snackBarConnectionSuccessRef = undefined);
      }

      if (this.connectionStatus.isConnectionError && !this.snackBarConnectionErrorRef) {
        this.snackBarConnectionErrorRef = this._snackBar.open('Connection could not be established!', 'Reload', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.snackBarConnectionErrorRef.onAction().subscribe(() => window.location.reload());
      }

      if (!this.connectionStatus.isConnectionError && this.snackBarConnectionErrorRef) {
        this.snackBarConnectionErrorRef.dismiss();
        this.snackBarConnectionErrorRef = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
    this.connectionStatusSubscription.unsubscribe();
  }

  openSettingsDialog(): void {
    const dialogConfig = this.setupDialogConfig();
    const dialogRef = this._dialog.open(SettingsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((newSettings: Settings) => {
      if (newSettings) {
        this._settingsService.setSettings(newSettings);
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
