import {Component, OnInit} from '@angular/core';

import {Subscription} from "rxjs";

import {GameData} from "../game-host/game-model/game-data";
import {SrtHostService} from "../game-host/srt-host.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
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
