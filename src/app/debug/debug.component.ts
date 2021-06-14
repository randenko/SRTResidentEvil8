import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from "rxjs";

import {GameData} from "../game-host/game-model/game-data";
import {SrtHostService} from "../game-host/srt-host.service";

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent implements OnInit, OnDestroy {
  gameData: GameData;
  private gameDataSubscription: Subscription;

  constructor(private srtHostService: SrtHostService) {
  }

  ngOnInit(): void {
    this.gameDataSubscription = this.srtHostService.getGameData().subscribe(gameData => {
      this.gameData = gameData;
    });
  }

  ngOnDestroy(): void {
    this.gameDataSubscription.unsubscribe();
  }

  getEventType(): string {
    switch (this.gameData?.EventType) {
      case 1:
        return "Skippable Cutscene";
      case 2:
        return "Unskippable Cutscene";
      case 3:
        return "Interactable Cutscene";
      default:
        return "None";
    }
  }

  isCutscene(): boolean {
    return this.gameData?.IsMotionPlay > 0;
  }

  getGameState(): string {
    if (this.gameData?.PlayerStatus.IsInShop) {
      return "Shop";
    } else if (this.gameData?.PlayerStatus.IsInInventoryMenu) {
      return "Inventory Menu";
    } else if (this.gameData?.PlayerStatus.IsInSelectMenu) {
      return "Select Menu";
    } else if (this.gameData?.PlayerStatus.IsHideShelf) {
      return "Hidden Shelf";
    } else if (this.gameData?.PlayerStatus.IsGameOver) {
      return "Game Over";
    }
    return "None";
  }
}
