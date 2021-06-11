import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from "rxjs";

import {SrtHostService} from "../game-host/srt-host.service";
import {GameData} from "../game-host/game-model/game-data";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {
  gameData: GameData;
  private gameDataSubscription: Subscription;

  constructor(private srtHostService: SrtHostService) {
  }

  ngOnInit(): void {
    this.gameDataSubscription = this.srtHostService.getGameData().subscribe(gameData => {
      this.gameData = gameData;
    })
  }

  ngOnDestroy(): void {
    this.gameDataSubscription.unsubscribe();
  }

}
