import * as ex from 'excalibur';
import Config from '../config';
import { stats } from '../stats';

export class HealthBar extends ex.ScreenElement {
  private readonly canvas: ex.Canvas;
  private currentHp: number;

  constructor() {
    super({
      pos: new ex.Vector(20, 0),
      width: Config.healthBarWidth,
      height: Config.healthBarHeight,
      anchor: ex.Vector.Zero.clone(),
    });

    this.canvas = new ex.Canvas({
      cache: true,
      draw: ctx => {
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'green';
        ctx.lineWidth = 3;
        ctx.font = 'normal 30px sans-serif';
        ctx.fillText('HP:', -5, -this.height);
        ctx.strokeRect(0, 0, Config.healthBarWidth + 10, this.height + 10);
        ctx.fillRect(5, 5, Config.healthBarWidth * (this.currentHp / Config.totalHp), Config.healthBarHeight);
      },
    });
    this.graphics.use(this.canvas);
  }

  onInitialize(engine: ex.Engine) {
    this.pos = new ex.Vector(20, engine.drawHeight - Config.healthBarHeight - 20);
  }

  onPreUpdate() {
    if (this.currentHp !== stats.hp) {
      this.currentHp = stats.hp;
      this.canvas.flagDirty();
    }
  }
}
