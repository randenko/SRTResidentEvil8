import {Injectable} from '@angular/core';

import {BehaviorSubject, Subject} from "rxjs";

import {Settings} from "./settings.model";
import {LocalStorageService} from "../local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private defaultSettings: Settings = new Settings(true, false, true, true,
    false, 500, "localhost", 7190);
  private currentSettings: Settings;

  settingsSubject: Subject<Settings>;

  constructor(private localStorage: LocalStorageService) {
    this.init();
    this.settingsSubject = new BehaviorSubject(this.currentSettings);
  }

  setSettings(settings: Settings): void {
    this.currentSettings = settings;
    this.localStorage.set("srtUISettings", settings);
    this.settingsSubject.next(settings);
  }

  private init(): void {
    const settings: Settings = this.localStorage.get("srtUISettings");
    if (settings) {
      this.currentSettings = settings;
    } else {
      this.currentSettings = this.defaultSettings;
    }
  }

}
