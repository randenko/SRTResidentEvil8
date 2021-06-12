import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {BehaviorSubject, interval, Observable, ReplaySubject, Subject, Subscription} from "rxjs";
import {mergeMap} from 'rxjs/operators';

import {SettingsService} from "../settings/settings.service";
import {Settings} from "../settings/settings.model";
import {GameData} from "./game-model/game-data";
import {ConnectionStatus} from "./game-model/connection-status-model";

@Injectable({
  providedIn: 'root'
})
export class SrtHostService implements OnDestroy {
  private settings: Settings;
  private settingsSubscription: Subscription;
  private gameDataSubject: Subject<GameData> = new ReplaySubject(1);
  private gameDataSubscription: Subscription;
  private connectionStatus: ConnectionStatus = new ConnectionStatus();
  private connectionStatusSubject: Subject<ConnectionStatus> = new BehaviorSubject(this.connectionStatus);

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

  getConnectionStatus(): Observable<ConnectionStatus> {
    return this.connectionStatusSubject.asObservable();
  }

  private init(): void {
    this.settingsSubscription = this.settingsService.getSettings().subscribe({
      next: value => {
        const previousSettings = this.settings;
        this.settings = value;

        if (!previousSettings || previousSettings.pollingRate !== value.pollingRate ||
          previousSettings.srtHostAddress !== this.settings.srtHostAddress ||
          previousSettings.srtHostPort !== this.settings.srtHostPort) {
          // reset connection status
          this.connectionStatus.isConnecting = true;
          this.connectionStatus.isConnectionSuccess = false;
          this.connectionStatus.isConnectionError = false;
          this.connectionStatusSubject.next(this.connectionStatus);

          // pre fetch data
          this.fetchGameData().toPromise().then(gameData => {
            this.gameDataSubject.next(gameData);

            // update connection status
            this.connectionStatus.isConnecting = false;
            this.connectionStatus.isConnectionSuccess = true;
            this.connectionStatusSubject.next(this.connectionStatus);

            // setup polling interval with new rate
            this.stopPollingInterval()
            this.startPollingInterval();
          }).catch(() => {
            this.connectionStatus.isConnecting = false;
            this.connectionStatus.isConnectionError = true;
            this.connectionStatusSubject.next(this.connectionStatus);
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
      .pipe(mergeMap(() => {
        return this.fetchGameData();
      })).subscribe(gameData => this.gameDataSubject.next(gameData), () => {
        this.stopPollingInterval();
        this.connectionStatus.isConnecting = false;
        this.connectionStatus.isConnectionSuccess = false;
        this.connectionStatus.isConnectionError = true;
        this.connectionStatusSubject.next(this.connectionStatus);
      });
  }

  private stopPollingInterval(): void {
    if (this.gameDataSubscription) {
      this.gameDataSubscription.unsubscribe();
    }
  }

}
