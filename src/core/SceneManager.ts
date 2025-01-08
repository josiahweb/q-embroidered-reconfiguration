import { Application, ProgressCallback } from 'pixi.js';
import Scene from './Scene';
import AssetLoader from './AssetLoader';

export interface SceneUtils {
  assetLoader: AssetLoader;
}

export default class SceneManager {
  private sceneConstructors = this.importScenes();
  private assetLoader = new AssetLoader();

  app: Application;
  sceneInstances = new Map<string, Scene>();
  currentScene?: Scene;

  constructor() {
    this.app = new Application();

    // @ts-expect-error Set PIXI app to global window object for the PIXI Inspector
    window.__PIXI_APP__ = this.app;
  }

  async initApp(loadList: string[], onProgress: ProgressCallback) {
    await this.app.init({
      background: '0x000000',
      width: 750,
      height: 1448,
    });

    document.querySelector('#stage')?.appendChild(this.app.canvas);

    await this.assetLoader.initAssets();

    this.assetLoader.loadAssetsWithStrategy(loadList, loadList.length, onProgress);
  }

  importScenes() {
    const sceneModules = import.meta.glob('/src/scenes/*.ts', {
      eager: true,
    }) as Record<string, { default: ConstructorType<typeof Scene> }>;

    return Object.entries(sceneModules).reduce(
      (acc, [path, module]) => {
        const fileName = path.split('/').pop()?.split('.')[0];

        if (!fileName) throw new Error('Error while parsing filename');

        acc[fileName] = module.default;

        return acc;
      },
      {} as Record<string, ConstructorType<typeof Scene>>,
    );
  }

  async switchScene(sceneName: string) {
    this.currentScene = this.sceneInstances.get(sceneName);

    if (!this.currentScene) this.currentScene = await this.initScene(sceneName);

    this.app.stage.addChild(this.currentScene);

    return this.currentScene;
  }

  async removeScene(destroyScene: boolean) {
    if (!this.currentScene) return;

    if (destroyScene) {
      this.sceneInstances.delete(this.currentScene.name);

      this.currentScene.destroy({ children: true });
    } else {
      this.app.stage.removeChild(this.currentScene);
    }

    this.currentScene = undefined;
  }

  private async initScene(sceneName: string) {
    const sceneUtils = {
      assetLoader: new AssetLoader(),
    };

    const scene = new this.sceneConstructors[sceneName](sceneUtils);

    this.sceneInstances.set(sceneName, scene);

    scene.load && (await scene.load());

    return scene;
  }
}
