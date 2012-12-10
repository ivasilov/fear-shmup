import * as ex from 'excalibur';
import { tilesSheet } from '../resources';

export class Bullet extends ex.Actor {
  public owner?: ex.Actor;
  constructor(x: number, y: number, dx: number, dy: number, owner?: ex.Actor) {
    super({
      pos: new ex.Vector(x, y),
      vel: new ex.Vector(dx, dy),
      width: 16,
      height: 16,
      collisionType: ex.CollisionType.Passive,
    });
    this.owner = owner;
  }

  onInitialize(engine: ex.Engine) {
    this.on('precollision', this.onPreCollision);
    // Clean up on exit viewport
    this.on('exitviewport', () => this.kill());

    const anim = tilesSheet.getSprite(0, 0);
    if (anim) {
      this.graphics.use(anim);
    }
  }

  private onPreCollision(evt: ex.PreCollisionEvent) {
    if (!(evt.other instanceof Bullet) && evt.other !== this.owner) {
      this.kill();
    }
  }
}
