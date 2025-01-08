import Scene from '@/core/Scene';
import { scene1Config } from '@/config/sprite.config';
import gsap from 'gsap';

type animations = { target: any; props: gsap.TweenVars; delay?: number }[];

export default class Scene1 extends Scene {
  name = 'Scene1';
  private timeline = gsap.timeline({ paused: true });
  private sceneLength = 2000;

  load() {
    const sprites = this.initSprites(scene1Config);
    sprites.forEach((sprite) => {
      this.addChild(sprite);
    });

    this.setupPhyTouch(this.sceneLength, (progress) => {
      this.timeline.seek(-progress / this.sceneLength);
    });

    this.setupAnimate();
  }

  setupAnimate() {
    // 配置动画信息
    const animations = [
      {
        target: this.getChildByName('scene1/images/title.png'),
        props: { y: '+=200', duration: -200 / this.sceneLength },
      },
    ];

    // 添加动画，通过delay区分是否为timeline主轴动画，计算总时长
    this.addAnimationTimeline(animations);
  }

  addAnimationTimeline(animations: animations) {
    animations.forEach(({ target, props, delay }) => {
      if (delay) {
        this.timeline.add(gsap.to(target, props), delay);
      } else {
        this.timeline.add(gsap.to(target, props));
      }
    });
  }
}
