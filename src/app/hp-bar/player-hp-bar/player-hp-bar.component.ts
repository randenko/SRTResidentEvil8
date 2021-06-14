import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from "rxjs";

import {GameData} from "../../game-host/game-model/game-data";
import {SrtHostService} from "../../game-host/srt-host.service";

@Component({
  selector: 'app-player-hp-bar',
  templateUrl: './player-hp-bar.component.html',
  styleUrls: ['./player-hp-bar.component.css']
})
export class PlayerHpBarComponent implements OnInit, OnDestroy {
  gameData: GameData;
  private gameDataSubscription: Subscription;

  constructor(private srtHostService: SrtHostService) {
  }

  ngOnInit(): void {
    this.gameDataSubscription = this.srtHostService.getGameData()
      .subscribe(gameData => {
        this.gameData = gameData;
      });
  }

  ngOnDestroy(): void {
    this.gameDataSubscription.unsubscribe();
  }

  getPlayerName(): string {
    return this.gameData.PlayerStatus.IsEthan ? "Ethan: " : this.gameData.PlayerStatus.IsChris ? "Chris: " : "";
  }

  getHealthStatus(): string {
    const hitPointPercent = this.getHeathBarPercentage();
    if (hitPointPercent >= 66) {
      return "fine";
    } else if (hitPointPercent < 66 && hitPointPercent >= 33) {
      return "caution";
    } else if (hitPointPercent < 33 && hitPointPercent >= 1) {
      return "danger";
    } else {
      return "dead";
    }
  }

  getHeathBarPercentage(): number {
    return (this.gameData.PlayerCurrentHealth / this.gameData.PlayerMaxHealth) * 100 || 0;
  }

  getHeathBarWidth(): { width: string } {
    return {width: this.getHeathBarPercentage() + "%"};
  }
}
