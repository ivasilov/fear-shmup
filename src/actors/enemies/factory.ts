import { ClassicEnemy } from './classic';
import { IEnemy } from './enemy';

type EnemyTypes = 'classic';

class EnemyFactory {
  instantiate = (type: EnemyTypes, x: number, y: number) => {
    switch (type) {
      case 'classic':
      default:
        return new ClassicEnemy(x, y);
    }
  };
}

export const enemyFactory = new EnemyFactory();
