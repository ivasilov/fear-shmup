import * as ex from 'excalibur';

import fighterFile from '../res/fighter.png';
import enemyFile from '../res/enemy.png';
import spriteexplosionFile from '../res/spriteexplosion.png';
import gameSheetFile from '../res/gameSheet.png';
import laserFile from '../res/laser.wav';
import enemyfireFile from '../res/enemyfire.wav';
import explodeFile from '../res/explode.wav';
import hitFile from '../res/hit.wav';
import powerupFile from '../res/powerup.wav';
import rocketFile from '../res/rocket.wav';
import shipsFile from '../res/kenney_pixelshmup/Tilemap/ships_packed.png';
import tilesFile from '../res/kenney_pixelshmup/Tilemap/tiles_packed.png';

const Images: { [key: string]: ex.Texture } = {
  fighter: new ex.Texture(fighterFile),
  ships: new ex.Texture(shipsFile),
  tiles: new ex.Texture(tilesFile),
  enemyPink: new ex.Texture(enemyFile),
  explosion: new ex.Texture(spriteexplosionFile),
  sheet: new ex.Texture(gameSheetFile),
};

const Sounds: { [key: string]: ex.Sound } = {
  laserSound: new ex.Sound(laserFile),
  enemyFireSound: new ex.Sound(enemyfireFile),
  explodeSound: new ex.Sound(explodeFile),
  hitSound: new ex.Sound(hitFile),
  powerUp: new ex.Sound(powerupFile),
  rocketSound: new ex.Sound(rocketFile),
};

const shipsSheet = new ex.SpriteSheet(Images.ships, 4, 6, 32, 32);
const tilesSheet = new ex.SpriteSheet(Images.tiles, 12, 10, 16, 16);
const explosionSpriteSheet = new ex.SpriteSheet(Images.explosion, 5, 5, 45, 45);
const gameSheet = new ex.SpriteSheet(Images.sheet, 10.0, 10.0, 32.0, 32.0);

const loader = new ex.Loader();
const allResources = { ...Images, ...Sounds };
for (const res in allResources) {
  loader.addResource(allResources[res]);
}

export { Images, Sounds, loader, shipsSheet, tilesSheet, explosionSpriteSheet, gameSheet };
