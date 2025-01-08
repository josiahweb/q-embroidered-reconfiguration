import { AssetPack } from '@assetpack/core';
import { pixiManifest } from '@assetpack/core/manifest';
import path from 'path'; //引入path用到了上面安装的@types/node
import { defineConfig, loadEnv, type Plugin, type ResolvedConfig } from 'vite';

export default ({ mode }) => {
  console.log('加载的环境变量', loadEnv(mode, process.cwd()).VITE_BASE_URL);
  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    plugins: [assetpackPlugin()],
    server: {
      port: 3000,
      host: true,
    },
    preview: {
      host: true,
      port: 8080,
    },
  });
};

function assetpackPlugin(): Plugin {
  // 这里定义了资产文件输入的文件夹以及输出的文件夹，以及对资产处理流程的数组
  const apConfig = {
    entry: './raw-assets',
    output: './public',
    pipes: [
      pixiManifest({
        output: `${path.resolve('./src')}/manifest.json`,
        createShortcuts: false,
        trimExtensions: false,
        includeMetaData: false,
        nameStyle: 'relative',
      }),
    ],
  };

  let mode: ResolvedConfig['command'];
  let ap: AssetPack | undefined;

  return {
    name: 'vite-plugin-assetpack',
    configResolved(resolvedConfig) {
      mode = resolvedConfig.command;
      if (!resolvedConfig.publicDir) return;
      if (apConfig.output) return;
      const publicDir = resolvedConfig.publicDir.replace(process.cwd(), '');
      apConfig.output = `.${publicDir}/assets/`;
    },
    buildStart: async () => {
      if (mode === 'serve') {
        if (ap) return;
        ap = new AssetPack(apConfig);
        void ap.watch();
      } else {
        await new AssetPack(apConfig).run();
      }
    },
    buildEnd: async () => {
      if (ap) {
        await ap.stop();
        ap = undefined;
      }
    },
  };
}
