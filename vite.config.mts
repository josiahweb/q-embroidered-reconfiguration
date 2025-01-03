import path from 'path'; //引入path用到了上面安装的@types/node
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  console.log('加载的环境变量', loadEnv(mode, process.cwd()).VITE_BASE_URL);
  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
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
