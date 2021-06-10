import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, Subject} from "rxjs";

import {Settings} from "./settings.model";
import {LocalStorageService} from "../local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private defaultSettings: Settings = new Settings(true, false, true, true, false, 500, "localhost", 7190);
  private settingsSubject: Subject<Settings>;

  constructor(private localStorage: LocalStorageService) {
    this.init();
  }

  setSettings(settings: Settings): void {
    this.localStorage.set("srtUISettings", settings);
    this.settingsSubject.next(settings);
  }

  getSettings(): Observable<Settings> {
    return this.settingsSubject.asObservable();
  }

  private init(): void {
    const settings: Settings = this.localStorage.get("srtUISettings") || this.defaultSettings;
    this.settingsSubject = new BehaviorSubject<Settings>(settings);
  }

}
