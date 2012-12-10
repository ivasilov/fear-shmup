import * as ex from 'excalibur';

import fighterFile from '../assets/fighter.png';
import enemyFile from '../assets/enemy.png';
import spriteexplosionFile from '../assets/spriteexplosion.png';
import gameSheetFile from '../assets/gameSheet.png';
import laserFile from '../assets/laser.wav';
import enemyfireFile from '../assets/enemyfire.wav';
import explodeFile from '../assets/explode.wav';
import hitFile from '../assets/hit.wav';
import powerupFile from '../assets/powerup.wav';
import rocketFile from '../assets/rocket.wav';
import shipsFile from '../assets/Tilemap/ships_packed.png';
import tilesFile from '../assets/Tilemap/tiles_packed.png';

const Images: { [key: string]: ex.ImageSource } = {
  fighter: new ex.ImageSource(fighterFile),
  ships: new ex.ImageSource(shipsFile),
  tiles: new ex.ImageSource(tilesFile),
  enemyPink: new ex.ImageSource(enemyFile),
  explosion: new ex.ImageSource(spriteexplosionFile),
  sheet: new ex.ImageSource(gameSheetFile),
};

const Sounds: { [key: string]: ex.Sound } = {
  laserSound: new ex.Sound(laserFile),
  enemyFireSound: new ex.Sound(enemyfireFile),
  explodeSound: new ex.Sound(explodeFile),
  hitSound: new ex.Sound(hitFile),
  powerUp: new ex.Sound(powerupFile),
  rocketSound: new ex.Sound(rocketFile),
};

const shipsSheet = ex.SpriteSheet.fromImageSource({
  image: Images.ships,
  grid: {
    columns: 4,
    rows: 6,
    spriteWidth: 32,
    spriteHeight: 32,
  },
});
const tilesSheet = ex.SpriteSheet.fromImageSource({
  image: Images.tiles,
  grid: {
    columns: 12,
    rows: 10,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});
const explosionSpriteSheet = ex.SpriteSheet.fromImageSource({
  image: Images.explosion,
  grid: {
    columns: 5,
    rows: 5,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

const gameSheet = ex.SpriteSheet.fromImageSource({
  image: Images.sheet,
  grid: {
    columns: 10,
    rows: 10,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

const loader = new ex.Loader();
const allResources = { ...Images, ...Sounds };
for (const res in allResources) {
  loader.addResource(allResources[res]);
}

export { Images, Sounds, loader, shipsSheet, tilesSheet, explosionSpriteSheet, gameSheet };
