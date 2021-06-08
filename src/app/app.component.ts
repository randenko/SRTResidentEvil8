import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SettingsDialogComponent} from "./settings/settings-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RE 8 Village SRT UI';

  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      'top': '64px',
      right: '0'
    };
    this.dialog.open(SettingsDialogComponent, dialogConfig);
  }
}
