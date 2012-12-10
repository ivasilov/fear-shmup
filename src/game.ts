import * as ex from 'excalibur';
import { Ship } from './actors/ship';
import { HealthBar } from './actors/health-bar';

import { stats } from './stats';
import { IEnemy } from './actors/enemies/enemy';
import Config from './config';

import { animManager } from './actors/animation-manager';
import { enemyFactory } from './actors/enemies/factory';

export class Game extends ex.Scene {
  // constructor(engine: ex.Engine) {
  //   super(engine);
  // }

  onInitialize(engine: ex.Engine) {
    engine.add(animManager);

    const ship = new Ship(engine.halfDrawWidth, 800, 80, 80);
    engine.add(ship);

    const healthBar = new HealthBar();
    engine.add(healthBar);

    const scoreLabel = new ex.Label({ text: 'Score: ' + stats.score, x: 20, y: 50 });
    scoreLabel.color = ex.Color.Azure;
    scoreLabel.scale = new ex.Vector(3, 3);
    scoreLabel.on('preupdate', function (this: ex.Label, evt) {
      this.text = 'Score: ' + stats.score;
    });
    engine.add(scoreLabel);

    const gameOverLabel = new ex.Label({
      text: 'Game Over',
      x: this.engine.halfDrawWidth - 250,
      y: engine.halfDrawHeight,
    });
    gameOverLabel.color = ex.Color.Green.clone();
    gameOverLabel.scale = new ex.Vector(8, 8);
    gameOverLabel.actions.repeatForever(context => {
      context.blink(1000, 1000, 400);
    });

    let baddieTimer = new ex.Timer({
      fcn: () => {
        const bad = enemyFactory.instantiate('classic', Math.random() * 1000 + 200, -100);
        engine.add(bad);
      },
      interval: Config.spawnTime,
      repeats: true,
    });

    this.add(baddieTimer);
    baddieTimer.start();

    engine.on('preupdate', () => {
      if (stats.gameOver) {
        engine.add(gameOverLabel);
      }
    });
  }
}
