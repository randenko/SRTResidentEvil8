import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {BehaviorSubject, interval, Observable, Subject, Subscription, throwError} from "rxjs";
import {catchError, switchMap} from 'rxjs/operators';

import {SettingsService} from "../settings/settings.service";
import {Settings} from "../settings/settings.model";
import {GameData} from "./game-model/game-data";

@Injectable({
  providedIn: 'root'
})
export class SrtHostService implements OnDestroy {
  private settings: Settings;
  private settingsSubscription: Subscription;
  private gameDataSubject: Subject<GameData> = new BehaviorSubject(null);
  private gameDataSubscription: Subscription;

  constructor(private settingsService: SettingsService, private http: HttpClient) {
    this.init();
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
    this.gameDataSubscription.unsubscribe();
  }

  getGameData(): Observable<GameData> {
    return this.gameDataSubject.asObservable();
  }

  private init(): void {
    this.settingsSubscription = this.settingsService.getSettings().subscribe({
      next: value => {
        const previousSettings = this.settings;
        this.settings = value;
        if (!previousSettings || previousSettings.pollingRate !== value.pollingRate) {
          this.fetchGameData().toPromise().then(gameData => {
            this.gameDataSubject.next(gameData);
            this.stopPollingInterval()
            this.startPollingInterval();
          }).catch(reason => {
            console.log("pre fetch failed!!")
            console.error(reason);
          });
        }
      }
    });
  }

  private fetchGameData(): Observable<GameData> {
    return this.http.get<GameData>("http://" + this.settings.srtHostAddress + ":" + this.settings.srtHostPort);
  }

  private startPollingInterval(): void {
    this.gameDataSubscription = interval(this.settings.pollingRate)
      .pipe(switchMap(() => {
        return this.fetchGameData().pipe(catchError(error => {
          return throwError(error);
        }));
      })).subscribe(gameData => this.gameDataSubject.next(gameData));
  }

  private stopPollingInterval(): void {
    if (this.gameDataSubscription) {
      this.gameDataSubscription.unsubscribe();
    }
  }

}
