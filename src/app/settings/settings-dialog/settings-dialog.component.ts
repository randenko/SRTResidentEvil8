import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {Settings} from "../settings.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css']
})
export class SettingsDialogComponent implements OnInit {
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<SettingsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private settings: Settings) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  saveSettings(): void {
    const value = this.settingsForm.value;
    const settings = new Settings(value.showCurrentEvent, value.showPlayerPosition, value.showStatistics, value.showEnemyHPBar,
      value.showDebugging, value.pollingRate, value.srtHostAddress, value.srtHostPort);
    this.dialogRef.close(settings);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private initForm() {
    this.settingsForm = this.fb.group({
      'showCurrentEvent': [this.settings.showCurrentEvent],
      'showPlayerPosition': [this.settings.showPlayerPosition],
      'showStatistics': [this.settings.showStatistics],
      'showEnemyHPBar': [this.settings.showEnemyHPBar],
      'showDebugging': [this.settings.showDebugging],
      'pollingRate': [this.settings.pollingRate, {
        validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(250)],
        updateOn: 'change'
      }],
      'srtHostAddress': [this.settings.srtHostAddress, {
        validators: [Validators.required],
        updateOn: 'change'
      }],
      'srtHostPort': [this.settings.srtHostPort, {
        validators: [Validators.required, Validators.pattern("^[0-9]*$")],
        updateOn: 'change'
      }]
    });
    this.settingsForm.markAllAsTouched();
  }

}
