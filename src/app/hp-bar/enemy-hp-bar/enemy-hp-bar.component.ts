import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from "rxjs";
import {SrtHostService} from "../../game-host/srt-host.service";
import {EnemyHealth} from "../../game-host/game-model/enemy-health";

@Component({
  selector: 'app-enemy-hp-bar',
  templateUrl: './enemy-hp-bar.component.html',
  styleUrls: ['./enemy-hp-bar.component.css']
})
export class EnemyHpBarComponent implements OnInit, OnDestroy {
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

  getHeathBarPercentage(enemy: EnemyHealth): number {
    return (enemy.CurrentHP / enemy.MaximumHP) * 100 || 0;
  }

  getHeathBarWidth(enemy: EnemyHealth): { width: string } {
    return {width: this.getHeathBarPercentage(enemy) + "%"};
  }

  private sortEnemies = (a: EnemyHealth, b: EnemyHealth): number => {
    return this.asc(this.getHeathBarPercentage(a), this.getHeathBarPercentage(b)) || this.desc(a.CurrentHP, b.CurrentHP);
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
