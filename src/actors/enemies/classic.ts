import * as ex from 'excalibur';
import Config from '../../config';
import { gameSheet, shipsSheet } from '../../resources';
import { Bullet } from '../bullet';
import { IEnemy } from './enemy';

export class ClassicEnemy extends IEnemy {
  onInitializeAnimation(engine: ex.Engine): void {
    const anim = shipsSheet.getSprite(14);
    // anim.rotation = 180;
    anim.flipVertical = true;
    anim.scale = new ex.Vector(4, 4);
    this.addDrawing('default', anim);
  }
  static WIDTH = 80;
  static HEIGHT = 80;

  constructor(x: number, y: number) {
    super(x, y, ClassicEnemy.WIDTH, ClassicEnemy.HEIGHT);
  }

  onInitializeMovement(engine: ex.Engine) {
    this.actions
      .moveTo(ClassicEnemy.WIDTH, ClassicEnemy.HEIGHT, Config.enemySpeed)
      .moveTo(engine.drawWidth - ClassicEnemy.WIDTH, ClassicEnemy.HEIGHT, Config.enemySpeed)
      .moveTo(ClassicEnemy.WIDTH, ClassicEnemy.HEIGHT, Config.enemySpeed)
      .repeatForever();
  }

  onInitializeFiring(engine: ex.Engine) {
    this.fireTimer = new ex.Timer({
      fcn: () => {
        this.fire(engine);
      },
      interval: Config.enemyFireInterval,
      repeats: true,
      numberOfRepeats: -1,
    });
    engine.addTimer(this.fireTimer);
  }

  private flipBarrel = true;
  private fire = (engine: ex.Engine) => {
    let bullet = new Bullet(
      this.pos.x + (this.flipBarrel ? -40 : 40),
      this.pos.y - 20,
      0,
      Config.enemyBulletVelocity,
      this,
    );
    this.flipBarrel = !this.flipBarrel;
    engine.add(bullet);
  };
}
