import { Sprite, Assets, Texture, Container } from 'pixi.js';
import type { SceneUtils } from './SceneManager';
import { spriteConfig } from '@/config/sprite.config';
import PhyTouch from 'phy-touch';

export abstract class Scene extends Container {
  touch: PhyTouch | undefined;
  abstract name: string;

  load?(): void | Promise<void>;
  unload?(): void | Promise<void>;
  initSprites(spriteConfig: spriteConfig): Sprite[] {
    return Object.entries(spriteConfig).map((item) => {
      const alias = item[0];
      const sprite = new Sprite(new Texture(Assets.get(alias)));
      sprite.label = alias;
      sprite.position.set(item[1].position.x, item[1].position.y);
      sprite.alpha = item[1].alpha;
      return sprite;
    });
  }
  setupPhyTouch(touchMin: number, change: (progress: number) => void) {
    this.touch = new PhyTouch({
      touch: 'body',
      maxSpeed: 0.0001,
      min: -touchMin, // 场景长度 减 留下一个屏幕宽度，这里之所以用负值，是为了将画布向左移动
      max: 0,
      bindSelf: false,
      value: 0,
      sensitivity: 1,
      change,
    });
  }
  destroyPhyTouch() {
    if (this.touch) {
      this.touch = undefined;
    }
  }

  constructor(protected utils: SceneUtils) {
    super();
  }
}

export default Scene;
