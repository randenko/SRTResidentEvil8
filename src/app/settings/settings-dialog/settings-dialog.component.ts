import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {Settings} from "../settings.model";
import {SettingsService} from "../settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private settingsService: SettingsService, private fb: FormBuilder,
              private dialogRef: MatDialogRef<SettingsDialogComponent>, @Inject(MAT_DIALOG_DATA) private currentSettings: Settings) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  saveSettings(): void {
    const form = this.settingsForm.value;
    const settings = new Settings(form.showCurrentEvent, form.showPlayerPosition, form.showStatistics, form.showEnemyHPBar,
      form.showDebugging, form.pollingRate, form.srtHostAddress, form.srtHostPort);
    this.settingsService.setSettings(settings);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private initForm() {
    this.settingsForm = this.fb.group({
      'showCurrentEvent': [this.currentSettings.showCurrentEvent],
      'showPlayerPosition': [this.currentSettings.showPlayerPosition],
      'showStatistics': [this.currentSettings.showStatistics],
      'showEnemyHPBar': [this.currentSettings.showEnemyHPBar],
      'showDebugging': [this.currentSettings.showDebugging],
      'pollingRate': [this.currentSettings.pollingRate, {
        validators: [Validators.required, Validators.min(250), Validators.pattern("^[0-9]*$")],
        updateOn: 'change'
      }],
      'srtHostAddress': [this.currentSettings.srtHostAddress, {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      'srtHostPort': [this.currentSettings.srtHostPort, {
        validators: [Validators.required, Validators.pattern("^[0-9]*$")],
        updateOn: 'change'
      }]
    });
    this.settingsForm.markAllAsTouched();
  }

}
