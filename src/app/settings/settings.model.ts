export class Settings {
  showCurrentEvent: boolean;
  showPlayerPosition: boolean;
  showStatistics: boolean;
  showEnemyHPBar: boolean;
  showDebugging: boolean;
  pollingRate: number;
  srtHostAddress: string;
  srtHostPort: number;

  constructor(showCurrentEvent: boolean, showPlayerPosition: boolean, showStatistics: boolean, showEnemyHPBar: boolean,
              showDebugging: boolean, pollingRate: number, srtHostAddress: string, srtHostPort: number) {
    this.showCurrentEvent = showCurrentEvent;
    this.showPlayerPosition = showPlayerPosition;
    this.showStatistics = showStatistics;
    this.showEnemyHPBar = showEnemyHPBar;
    this.showDebugging = showDebugging;
    this.pollingRate = pollingRate;
    this.srtHostAddress = srtHostAddress;
    this.srtHostPort = srtHostPort;
  }
}
