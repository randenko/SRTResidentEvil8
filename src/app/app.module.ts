import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DebugComponent} from './debug/debug.component';
import {EventComponent} from './event/event.component';
import {PlayerHpBarComponent} from './hp-bar/player-hp-bar/player-hp-bar.component';
import {EnemyHpBarComponent} from './hp-bar/enemy-hp-bar/enemy-hp-bar.component';
import {HpBarComponent} from './hp-bar/hp-bar.component';
import {PositionComponent} from './position/position.component';
import {StatisticsComponent} from './statistics/statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    DebugComponent,
    EventComponent,
    PlayerHpBarComponent,
    EnemyHpBarComponent,
    HpBarComponent,
    PositionComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
