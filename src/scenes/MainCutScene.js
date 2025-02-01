import GlobalAudio from "../components/GlobalAudio.js";

export default class MainCutScene extends Phaser.Scene {
    constructor(key, backgroundImage, nextScene) {
        super({ key });
        this.backgroundImage = backgroundImage;
        this.nextScene = nextScene;
    }

    preload() {
    }

    create() {

        GlobalAudio.music.stop();
        GlobalAudio.music = this.sound.add('cutScene');
        GlobalAudio.music.play({ loop: true });
      
        // Set background
        this.add.image(this.scale.width / 2, this.scale.height / 2, this.backgroundImage).setOrigin(0.5, 0.5);

        // Create animations
        this.createAnimation('fireBurn', 'fire', 6);
        this.createAnimation('shadowMove', 'shadow', 6);

        // Fire animation (full screen)
        this.fire = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'fire1');
        this.fire.displayWidth = 512;
        this.fire.displayHeight = 512;
        this.fire.play('fireBurn');

        // Shadow animation (full screen)
        this.shadow = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'shadow1');
        this.shadow.displayWidth = 512;
        this.shadow.displayHeight = 512;
        this.shadow.play('shadowMove');

        // Click to go to the next scene
        this.input.on('pointerdown', () => {
            this.scene.start('MainCutScene2');
        });

        this.text = "King: \nMy faithful knights, I am\n hungry. I order you to\n find a chicken and then\n slay it for my feast!";
        this.displayText = '';
        this.textIndex = 0;
        this.textObject = this.add.text(50, 50, '', { fontSize: '32px', fontFamily: 'MyCustomFont', fill: '#fff', wordWrap: { width: 400, useAdvancedWrap: true }, backgroundColor: '#000000' });
        this.clickSound = this.sound.add('clickSound');
        this.finished = false;
        this.soundPlaying = false;
        this.callback = this.soldierTalk

        this.time.addEvent({
            delay: 60,
            callback: this.typeLetter,
            callbackScope: this,
            loop: true
        });

    }

    createAnimation(key, prefix, frameCount) {
        if (!this.anims.exists(key)) {
            this.anims.create({
                key: key,
                frames: Array.from({ length: frameCount }, (_, i) => ({ key: `${prefix}${i + 1}` })),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    soldierTalk() {
        this.text = "Knight: \nThe order will be\n completed, Your Majesty!\n Chicken shall fall!";
        this.displayText = '';
        this.textIndex = 0;
        this.textObject = this.add.text(150, 150, '', { fontSize: '32px', fontFamily: 'MyCustomFont', fill: '#fff', wordWrap: { width: 400, useAdvancedWrap: true }, backgroundColor: '#000000' });
        this.clickSound = this.sound.add('clickSound');
        this.finished = false;
        this.soundPlaying = false;
        this.callback = () => {this.scene.start('DialogueScene2'); }

        this.time.addEvent({
            delay: 60,
            callback: this.typeLetter,
            callbackScope: this,
            loop: true
        });
    }

    typeLetter() {
        if (this.textIndex < this.text.length) {
            this.displayText += this.text[this.textIndex];
            this.textObject.setText(this.displayText);
    
            if (!this.soundPlaying) {
                this.clickSound.play();
                this.soundPlaying = true;
                this.clickSound.once('complete', () => {
                    this.soundPlaying = false;
                });
            }
            this.textIndex++;
        } else if (!this.finished) {
            this.finished = true;
    
            this.time.delayedCall(3000, () => {
                this.textObject.setText("");  // Clears the text
                this.displayText = ""; // Clears the stored text content
                this.textIndex = 0; // Resets index (if needed for reusing)
                
                if (this.callback) {
                    this.callback(); // Call the next function (if assigned)
                }
            });
        }
    }
}



// Scene 1
export class Scene1 extends MainCutScene {
    constructor() {
        super('Scene1', 'scene1', 'Scene2');
    }
}

// Scene 2
export class Scene2 extends MainCutScene {
    constructor() {
        super('Scene2', 'scene2', 'Scene3');
    }
}

// Scene 3 (loops back to Scene1)
export class Scene3 extends MainCutScene {
    constructor() {
        super('Scene3', 'scene3', 'Scene1');
    }
}