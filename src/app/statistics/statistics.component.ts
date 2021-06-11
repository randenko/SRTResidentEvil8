import {Component, OnInit} from '@angular/core';

import {Subscription} from "rxjs";

import {GameData} from "../game-host/game-model/game-data";
import {SrtHostService} from "../game-host/srt-host.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  gameData: GameData;
  private gameDataSubscription: Subscription;

  constructor(private srtHostService: SrtHostService) {
  }

  ngOnInit(): void {
    this.gameDataSubscription = this.srtHostService.getGameData().subscribe(gameDate => {
      this.gameData = gameDate;
    })
  }

  ngOnDestroy(): void {
    this.gameDataSubscription.unsubscribe();
  }

}
