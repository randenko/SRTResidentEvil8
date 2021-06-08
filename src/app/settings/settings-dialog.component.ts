import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import {Settings} from "./settings.model";
import {SettingsService} from "./settings.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-settings',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private settingsService: SettingsService, private fb: FormBuilder,
              private dialogRef: MatDialogRef<SettingsDialogComponent>) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  saveSettings(): void {
    const form = this.settingsForm.value;
    const settings = new Settings(form.showCurrentEvent, form.showPlayerPosition, form.showStatistics, form.showEnemyHPBar,
      form.showDebugging, form.pollingRate, form.srtHostAddress, form.srtHostPort);
    this.settingsService.setSettings(settings);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  private initForm() {
    const currentSettings: Settings = this.settingsService.getSettings();
    this.settingsForm = this.fb.group({
      'showCurrentEvent': [currentSettings.showCurrentEvent],
      'showPlayerPosition': [currentSettings.showPlayerPosition],
      'showStatistics': [currentSettings.showStatistics],
      'showEnemyHPBar': [currentSettings.showEnemyHPBar],
      'showDebugging': [currentSettings.showDebugging],
      'pollingRate': [currentSettings.pollingRate],
      'srtHostAddress': [currentSettings.srtHostAddress],
      'srtHostPort': [currentSettings.srtHostPort]
    });
  }

}
