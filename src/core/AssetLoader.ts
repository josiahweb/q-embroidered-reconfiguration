import { Assets, ProgressCallback } from 'pixi.js';
import manifest from '@/manifest.json';

export default class AssetLoader {
  manifest: Manifest;

  constructor() {
    this.manifest = manifest;
  }

  async initAssets() {
    await Assets.init({ manifest });
  }

  loadAssetsWithStrategy(loadList: string[], index: number, onProgress?: ProgressCallback | undefined) {
    const eagerList = loadList.slice(0, index);
    Assets.loadBundle(eagerList, (progress) => {
      if (onProgress) {
        onProgress(progress);
      }

      if (progress === 1 && index < loadList.length) {
        const lazyList = loadList.slice(index);
        Assets.backgroundLoadBundle(lazyList);
      }
    });
  }

  async loadAssetsGroup(group: string, isBackgroundLoad = false) {
    const resources = isBackgroundLoad ? await Assets.backgroundLoadBundle(group) : await Assets.loadBundle(group);

    return resources;
  }
}
