import {PlayerStatus} from "./player-status";
import {LastKeyItem} from "./last-key-item";
import {EnemyHealth} from "./enemy-health";
import {PlayerInventory} from "./player-inventory";

export interface GameData {
  VersionInfo: string,
  PlayerCurrentHealth: number,
  PlayerMaxHealth: number,
  PlayerPositionX: number,
  PlayerPositionY: number,
  PlayerPositionZ: number,
  RankScore: number,
  Rank: number,
  Lei: number,
  EventType: number,
  IsMotionPlay: number,
  CurrentEvent: string,
  PlayerStatus: PlayerStatus,
  LastKeyItem: LastKeyItem,
  EnemyHealth: EnemyHealth[],
  PlayerInventory: PlayerInventory[]
}
