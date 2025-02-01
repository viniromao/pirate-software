export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
        this.text = null;
    }

    preload() {
        this.holdOnBaby()

        this.load.image('background', 'assets/16jam_background.png');
        this.load.image('backgroundDesert', 'assets/16jam_desert_background.png');
        this.load.image('tree', 'assets/16jam_tree.png');
        this.load.image('table', 'assets/16jam_table.png');
        this.load.image('king', 'assets/king.png');
        this.load.audio('backgroundMusic', 'assets/sounds/argument.mp3');
        this.load.audio('positive', 'assets/sounds/conviencing_point_earning.wav');
        this.load.audio('negative', 'assets/sounds/conviencing_point_lose.wav');
        this.load.audio('cutScene', 'assets/sounds/argument song(new option).mp3');
        this.load.audio('adjustSound', 'assets/sounds/adjust_sound.mp3');
        this.load.audio('intro', 'assets/sounds/adjust_sound.mp3');
        this.load.audio('winSound', 'assets/sounds/win.wav');
        this.load.audio('loseSound', 'assets/sounds/lose.wav');
        this.load.image('forest_sword', 'assets/sword4.png');

        this.load.image('arrowLeft', 'assets/arrow-up.png');
        this.load.image('arrowRight', 'assets/arrow-up.png');

        this.load.audio('clickSound', 'assets/sounds/text_display_sound.wav');


        for (let i = 1; i <= 7; i++) {
            this.load.image(`background${i}`, `assets/16jam_forest${i}.png`); // Replace with your paths
        }

        for (let i = 1; i <= 2; i++) {
            this.load.image(`level${i}`, `assets/level${i}.png`); // Replace with your paths
        }

        for (let i = 1; i <= 4; i++) {
            this.load.image(`sword${i}`, `assets/sword${i}.png`); // Replace with your paths
        }

        this.load.image('scene1', 'assets/scene_1.png');
        this.load.image('scene2', 'assets/scene_5.png');
        this.load.image('scene3', 'assets/scene_14.png');

        for (let i = 1; i <= 6; i++) {
            this.load.image(`fire${i}`, `assets/fire${i}.png`); // Replace with your paths
        }

        
        for (let i = 1; i <= 6; i++) {
            this.load.image(`shadow${i}`, `assets/shadow${i}.png`); // Replace with your paths
        }


    }

    create() {
         console.log(
          `%c
           ███╗   ██╗ %c███████╗ %c ██████╗ 
          %c ████╗  ██║ %c██╔════╝ %c██╔═══██╗
          %c ██╔██╗ ██║ %c█████╗   %c██║   ██║
          %c ██║╚██╗██║ %c██╔══╝   %c██║   ██║
          %c ██║ ╚████║ %c███████╗ %c╚██████╔╝
          %c ╚═╝  ╚═══╝ %c╚══════╝  %c╚═════╝ 
          `,
          'color: #4dccff; font-size: 16px;', // N (Tomato)
          'color: #ffad0a; font-size: 16px;', // E (Orange)
          'color: #ff0a0a; font-size: 16px;', // O (Dodger Blue)
          'color: #4dccff; font-size: 16px;', // N (Tomato)
          'color: #ffad0a; font-size: 16px;', // E
          'color: #ff0a0a; font-size: 16px;', // O
          'color: #4dccff; font-size: 16px;', // N (Tomato)
          'color: #ffad0a; font-size: 16px;', // E
          'color: #ff0a0a; font-size: 16px;', // O
          'color: #4dccff; font-size: 16px;', // N (Tomato)
          'color: #ffad0a; font-size: 16px;', // E
          'color: #ff0a0a; font-size: 16px;', // O
          'color: #4dccff; font-size: 16px;', // N (Tomato)
          'color: #ffad0a; font-size: 16px;', // E
          'color: #ff0a0a; font-size: 16px;', // O
          'color: #4dccff; font-size: 16px;', // N (Tomato)
          'color: #ffad0a; font-size: 16px;', // E
          'color: #ff0a0a; font-size: 16px;'  // O
        );

        console.log(`%c We love making games! ❤️`, 'color: #4dccff; font-size: 16px;');

        console.log(`%cIf you found this message you might wanna know how we've made this game 👌`, 'color: #ffad0a; font-size: 16px;');
        console.log(`%cWe've used Phaser library to make it and it is entirely written in javascript`, 'color: #ff0a0a; font-size: 16px;');
        console.log(`%cOur team is all around the world!`, 'color: #4dccff; font-size: 16px;');
        console.log(`%cThe code for this game is entirely public, checkout its Github page https://github.com/viniromao/pirate-software👍`, 'color: #ffad0a; font-size: 16px;');
        this.text.destroy();

        this.scene.start('VolumeControlScene');
    }

    holdOnBaby() {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        // Base text
        const baseText = "Hold on baby";
        const maxDots = 3; // Maximum number of dots

        // Add text to the center of the screen
        this.text = this.add.text((screenWidth / 2) - 90, (screenHeight / 2) - 50, baseText, {
            fontFamily: 'MyCustomFont',
            fontSize: '32px',
            color: '#ffffff',
        });

        let dotCount = 0;

        // Add a timed event to update the dots
        this.time.addEvent({
            delay: 100, // Update interval (200ms)
            callback: () => {
                dotCount = (dotCount + 1) % (maxDots + 1); // Cycle through 0, 1, 2, 3 dots

                // Update the text with consistent spacing to prevent movement
                const updatedText = baseText + '.'.repeat(dotCount) + ' '.repeat(maxDots - dotCount);
                this.text.setText(updatedText);
            },
            loop: true,
        });
    }
}