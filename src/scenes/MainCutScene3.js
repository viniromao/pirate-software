import GlobalAudio from "../components/GlobalAudio.js";
import PlayerData from "../components/PlayerData.js";

export default class MainCutScene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'MainCutScene3' });
    }

    preload() {
    }

    create() {

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        this.backgroundImage = 'scene3';

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

        const sword = this.add.image(centerX, centerY, PlayerData.selectedCharacter);

        // Scale and center the imag
        sword.setScale(1).setOrigin(0.5, 0.5);

        this.input.on('pointerdown', () => {
            GlobalAudio.music.stop();
            this.scene.start('DialogueScene3');
        });

        this.kingTalk();
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

    kingTalk(){
        this.text = "SWORD: \nNOOOOO!!! You don't\n have the right to\n kill the chicken!\n Let's talk first!";
        this.displayText = '';
        this.textIndex = 0;
        this.textObject = this.add.text(100, 100, '', { fontSize: '32px', fontFamily: 'MyCustomFont', fill: '#fff', wordWrap: { width: 400, useAdvancedWrap: true }, backgroundColor: '#000000' });
        this.clickSound = this.sound.add('clickSound');
        this.finished = false;
        this.soundPlaying = false;
        this.callback = () => {
            GlobalAudio.music.stop();
            this.scene.start('DialogueScene3'); }


        this.time.addEvent({
            delay: 80,
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