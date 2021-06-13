import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {DebugComponent} from './debug/debug.component';
import {EventComponent} from './event/event.component';
import {HpBarComponent} from './hp-bar/hp-bar.component';
import {PlayerHpBarComponent} from './hp-bar/player-hp-bar/player-hp-bar.component';
import {EnemyHpBarComponent} from './hp-bar/enemy-hp-bar/enemy-hp-bar.component';
import {PositionComponent} from './position/position.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {SettingsDialogComponent} from './settings/settings-dialog/settings-dialog.component';
import {MaterialModule} from "./material.module";
import {ENVIRONMENT_SPECIFIC_PROVIDERS} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    DebugComponent,
    EventComponent,
    PlayerHpBarComponent,
    EnemyHpBarComponent,
    HpBarComponent,
    PositionComponent,
    StatisticsComponent,
    SettingsDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    ENVIRONMENT_SPECIFIC_PROVIDERS
  ],
  bootstrap: [AppComponent],
  entryComponents: [SettingsDialogComponent]
})
export class AppModule {

}
