import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable, Subscription} from "rxjs";

import {SettingsService} from "../settings/settings.service";
import {Settings} from "../settings/settings.model";
import {GameData} from "./game-model/game-data";

@Injectable({
  providedIn: 'root'
})
export class SrtHostService implements OnDestroy {
  private settings: Settings;
  private settingsSubscription: Subscription;

  constructor(private settingsService: SettingsService, private http: HttpClient) {
    this.init();
  }

  private init(): void {
    this.settingsSubscription = this.settingsService.getSettings().subscribe({
      next: value => this.settings = value
    });
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }

  fetchData(): Observable<GameData> {
    return this.http.get<GameData>("http://" + this.settings.srtHostAddress + ":" + this.settings.srtHostPort);
  }

}
