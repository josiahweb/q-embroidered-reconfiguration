import SceneManager from './core/SceneManager';

const sceneManager = new SceneManager();

const loadList = ['scene1', 'scene2'];

sceneManager.initApp(loadList, (progress) => {
  if (progress === 1) sceneManager.switchScene('Scene1');
});
