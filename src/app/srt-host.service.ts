import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Subscription} from "rxjs";

import {SettingsService} from "./settings/settings.service";
import {Settings} from "./settings/settings.model";

@Injectable({
  providedIn: 'root'
})
export class SrtHostService implements OnDestroy {
  currentSettings: Settings;
  settingsSubscription: Subscription;

  constructor(private settingsService: SettingsService, private http: HttpClient) {
    this.init();
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }

  private init(): void {
    this.settingsSubscription = this.settingsService.settingsChanged.subscribe({
      next: value => this.currentSettings = value
    });
  }

}
