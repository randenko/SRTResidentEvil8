import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from "rxjs";

import {SrtHostService} from "../../game-host/srt-host.service";
import {EnemyHealth} from "../../game-host/game-model/enemy-health";
import {Settings} from "../../settings/settings.model";

@Component({
  selector: 'app-enemy-hp-bar',
  templateUrl: './enemy-hp-bar.component.html',
  styleUrls: ['./enemy-hp-bar.component.css']
})
export class EnemyHpBarComponent implements OnInit, OnDestroy {
  @Input() settings: Settings;
  enemies: EnemyHealth[];
  private gameDataSubscription: Subscription;

  constructor(private srtHostService: SrtHostService) {
  }

  ngOnInit(): void {
    this.gameDataSubscription = this.srtHostService.getGameData()
      .subscribe(gameData => {
        this.enemies = gameData.EnemyHealth?.sort(this.sortEnemies) || [];
      });
  }

  ngOnDestroy(): void {
    this.gameDataSubscription.unsubscribe();
  }

  getHeathPercentage(enemy: EnemyHealth): number {
    return (enemy.CurrentHP / enemy.MaximumHP) * 100 || 0;
  }

  getHeathBarWidth(enemy: EnemyHealth): { width: string } {
    return {width: this.getHeathPercentage(enemy) + "%"};
  }

  private sortEnemies = (a: EnemyHealth, b: EnemyHealth): number => {
    return this.asc(this.getHeathPercentage(a), this.getHeathPercentage(b)) || this.desc(a.CurrentHP, b.CurrentHP);
  }

  private asc = (a: number, b: number): number => {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
  };

  private desc = (a: number, b: number): number => {
    if (a > b) return -1;
    if (a < b) return +1;
    return 0;
  };

}
