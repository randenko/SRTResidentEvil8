import {Injectable} from '@angular/core';

import {Subject} from "rxjs";

import {Settings} from "./settings.model";
import {LocalStorageService} from "../local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private defaultSettings: Settings = new Settings(true, true, true, true,
    true, 500, "localhost", 7190);
  private currentSettings: Settings;

  settingsSubject = new Subject<Settings>();

  constructor(private localStorage: LocalStorageService) {
    this.init();
  }

  getSettings(): Settings {
    return this.currentSettings;
  }

  setSettings(settings: Settings): void {
    this.currentSettings = settings;
    this.localStorage.set("srtUISettings", settings);
    this.settingsSubject.next(settings);
  }

  private init(): void {
    const settings = this.localStorage.get("srtUISettings");
    if (settings) {
      this.currentSettings = settings;
    } else {
      this.currentSettings = this.defaultSettings;
    }
  }

}
