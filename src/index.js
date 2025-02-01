import PreloaderScene from './scenes/PreloaderScene.js';
import IntroScene from './scenes/IntroScene.js';
import ForestScene from './scenes/ForestScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import WinScene from './scenes/WinScene.js'
import VolumeControlScene from './scenes/VolumeControlScene.js';
import LevelSelectorScene from './scenes/LevelSelectorScene.js';
import CharacterSelectorScene from './scenes/CharacterSelectionScene.js';
import DialogueScene from './scenes/DialogueScene.js';
import { Scene1, Scene2, Scene3 } from './scenes/MainCutScene.js';
import DialogueScene2 from './scenes/DialogueScene2.js';
import MainCutScene2 from './scenes/MainCutScene2.js';
import MainCutScene3 from './scenes/MainCutScene3.js';
import DesertScene from './scenes/DesertScene.js';
import DialogueScene3 from './scenes/DialogueScene3.js';
import DialogueScene4 from './scenes/DialogueScene4.js';

export function startGame() {
  const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 512,
    backgroundColor: '#00000',
    render: {
      antialias: true,
      pixelArt: true,
    },
    scene: [PreloaderScene, LevelSelectorScene, VolumeControlScene, IntroScene, CharacterSelectorScene, ForestScene, DialogueScene, DialogueScene4, GameOverScene, WinScene, Scene1, Scene2, Scene3, DialogueScene2, MainCutScene2, DialogueScene3, MainCutScene3, DesertScene ],
  };

  const game = new Phaser.Game(config);

  game.events.on('hidden', () => game.sound.context.suspend());
  game.events.on('visible', () => game.sound.context.resume());
}
