import * as ex from 'excalibur';
import { Sounds, gameSheet } from '../resources';
import { Bullet } from './bullet';

export class Missile extends ex.Actor {
  constructor() {
    super({
      pos: ex.Vector.Zero,
      width: 60,
      height: 20,
    });

    this.on('precollision', this.onPreCollision);
    this.on('exitviewport', () => {
      Sounds.rocketSound.stop();
      this.kill();
    });
  }

  onInitialize(engine: ex.Engine) {
    const anim = new ex.Animation({
      frames: [
        { graphic: gameSheet.getSprite(1, 3)!, duration: 50 },
        { graphic: gameSheet.getSprite(1, 4)!, duration: 50 },
        { graphic: gameSheet.getSprite(1, 5)!, duration: 50 },
      ],
    });
    anim.scale = new ex.Vector(3, 3);
  }

  onPreCollision(evt: ex.PreCollisionEvent) {
    if (!(evt.other instanceof Bullet)) {
      Sounds.rocketSound.stop();
      Sounds.explodeSound.play();
      this.kill();
    }
  }
}
