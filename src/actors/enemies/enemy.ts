import * as ex from 'excalibur';
import { Sounds, explosionSpriteSheet } from '../../resources';
import { Bullet } from '../bullet';
import { animManager } from '../animation-manager';
import { stats } from '../../stats';

export abstract class IEnemy extends ex.Actor {
  protected fireTimer?: ex.Timer;

  private explode?: ex.Animation;
  abstract onInitializeMovement(engine: ex.Engine): void;

  abstract onInitializeFiring(engine: ex.Engine): void;

  abstract onInitializeAnimation(engine: ex.Engine): void;

  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
    });

    // Passive recieves collision events but does not participate in resolution
    this.body.collider.type = ex.CollisionType.Passive;

    // Setup listeners
    this.on('precollision', this.onPreCollision);
  }

  onInitialize(engine: ex.Engine) {
    this.explode = explosionSpriteSheet.getAnimationForAll(engine, 40);
    this.explode.scale = new ex.Vector(3, 3);
    this.explode.loop = false;

    this.onInitializeAnimation(engine);
    this.onInitializeMovement(engine);
    this.onInitializeFiring(engine);
  }

  // Fires before excalibur collision resoulation
  private onPreCollision(evt: ex.PreCollisionEvent) {
    if (evt.other instanceof Bullet) {
      if (evt.other.owner instanceof IEnemy) {
        return;
      }
    }

    // only kill a baddie if it collides with something that isn't a baddie or a baddie bullet
    if (!(evt.other instanceof IEnemy)) {
      Sounds.explodeSound.play();
      if (this.explode) {
        animManager.play(this.explode, this.pos);
      }

      stats.score += 100;
      if (this.fireTimer) {
        this.fireTimer.cancel();
      }
      this.kill();
    }
  }
}
