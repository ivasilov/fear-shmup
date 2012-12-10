import * as ex from 'excalibur';
import { gameSheet, Sounds, explosionSpriteSheet, shipsSheet } from '../resources';
import Config from '../config';
import { Bullet } from './bullet';
import { IEnemy } from './enemies';
import { animManager } from './animation-manager';
import { stats } from '../stats';

type FireFunction = (engine: ex.Engine) => void;
const throttle = function (this: any, func: FireFunction, throttle: number): FireFunction {
  var lastTime = Date.now();
  var throttle = throttle;
  return (engine: ex.Engine) => {
    var currentTime = Date.now();
    if (currentTime - lastTime > throttle) {
      var val = func.apply(this, [engine]);
      lastTime = currentTime;
      return val;
    }
  };
};

export class Ship extends ex.Actor {
  private flipBarrel = false;
  private throttleFire?: FireFunction;
  private explode?: ex.Animation;
  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: new ex.Vector(x, y),
      width: 32,
      height: 32,
      collisionType: ex.CollisionType.Passive,
    });
  }

  onInitialize(engine: ex.Engine) {
    this.throttleFire = throttle(this.fire, Config.playerFireThrottle);
    this.on('precollision', this.onPreCollision);

    // Keyboard
    engine.input.keyboard.on('hold', evt => this.handleKeyEvent(engine, evt));
    engine.input.keyboard.on('release', (evt: ex.Input.KeyEvent) => {
      if (evt.key !== ex.Input.Keys.Space) {
        this.vel = ex.Vector.Zero.clone();
      }
    });

    // Get animation
    const anim = shipsSheet.getSprite(0, 0);
    if (anim) {
      anim.scale = new ex.Vector(4, 4);
      this.graphics.use(anim);
    }

    this.explode = ex.Animation.fromSpriteSheet(
      explosionSpriteSheet,
      ex.Util.range(0, 24),
      40,
      ex.AnimationStrategy.End,
    );
    this.explode.scale = new ex.Vector(3, 3);

    // const ray = new ex.Ray(ex.vec(0, 0), ex.Vector.fromAngle(Math.PI / 4));

    // const maxLength = 100; // pixels

    // // Returns vector (50, 50) that is the top left corner of the box actor
    // const maybeCollisionPoint1 = this.collider.get().rayCast(ray, maxLength);

    // // Returns null when no collision when ray casting only 10 pixels
    // const maybeCollisionPoint2 = this.collider.get().rayCast(ray, 10);
  }

  onPreCollision(evt: ex.PreCollisionEvent) {
    const isEnemyBullet = evt.other instanceof Bullet && evt.other.owner instanceof IEnemy;

    if (evt.other instanceof IEnemy || isEnemyBullet) {
      Sounds.hitSound.play();
      this.actions.blink(300, 300, 3);
      stats.hp -= Config.enemyDamage;
      if (stats.hp <= 0) {
        stats.gameOver = true;
        this.kill();
        this.stopRegisteringFireThrottleEvent();
      }
    }
  }

  private stopRegisteringFireThrottleEvent = () => {
    this.throttleFire = undefined;
  };

  onPostUpdate(engine: ex.Engine, delta: number) {
    if (stats.hp <= 0 && this.explode) {
      // update game to display game over
      // gameOver = true;
      animManager.play(this.explode, this.pos);
      Sounds.explodeSound.play();
      this.kill();
    }

    // Keep player in the viewport
    if (this.pos.x < this.width) this.pos.x = this.width;
    if (this.pos.y < this.height) this.pos.y = this.height;
    if (this.pos.x > engine.drawWidth - this.width) this.pos.x = engine.drawWidth - this.width;
    if (this.pos.y > engine.drawHeight - this.height) this.pos.y = engine.drawHeight - this.height;
  }

  private fire = (engine: ex.Engine) => {
    let bullet = new Bullet(
      this.pos.x + (this.flipBarrel ? -40 : 40),
      this.pos.y - 20,
      0,
      Config.playerBulletVelocity,
      this,
    );
    this.flipBarrel = !this.flipBarrel;
    Sounds.laserSound.play();
    engine.add(bullet);
  };

  handleKeyEvent = (engine: ex.Engine, evt: ex.Input.KeyEvent) => {
    let dir = ex.Vector.Zero.clone();

    if (evt.key === ex.Input.Keys.Space) {
      this.throttleFire ? this.throttleFire(engine) : null;
      if (this.vel.x !== 0 || this.vel.y !== 0) {
        dir = this.vel.normalize();
      }
    }
    // Some keys do the same thing
    if (evt.key === ex.Input.Keys.Up || evt.key === ex.Input.Keys.W) {
      dir.y += -1;
    }

    if (evt.key === ex.Input.Keys.Left || evt.key === ex.Input.Keys.A) {
      dir.x += -1;
    }

    if (evt.key === ex.Input.Keys.Right || evt.key === ex.Input.Keys.D) {
      dir.x += 1;
    }

    if (evt.key === ex.Input.Keys.Down || evt.key === ex.Input.Keys.S) {
      dir.y += 1;
    }

    if (dir.x !== 0 || dir.y !== 0) {
      this.vel = dir.normalize().scale(Config.playerSpeed);
    }
  };
}
