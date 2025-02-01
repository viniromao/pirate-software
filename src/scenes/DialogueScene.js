import PlayerData from "../components/PlayerData.js";

export default class DialogueScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DialogueScene' });
    }

    preload() {
    }

    create() {
      
        const sword = this.add.image(this.scale.width - 300, this.scale.height -180, PlayerData.selectedCharacter).setRotation(-Math.PI /2);

        // Scale and center the imag
        sword.setScale(.5).setOrigin(0.5, 0.5);

        this.text = "The king, unimpressed by \n common kitchen knives, \ndecrees that only a mighty\n sword like YOU is worthy of \nslaying the royal chicken for \ntonight's feast.";
        this.displayText = '';
        this.textIndex = 0;
        this.textObject = this.add.text(50, 50, '', { fontSize: '32px', fontFamily: 'MyCustomFont', fill: '#fff', wordWrap: { width: 400, useAdvancedWrap: true } });
        this.clickSound = this.sound.add('clickSound');
        this.finished = false;
        this.soundPlaying = false;

        this.time.addEvent({
            delay: 60,
            callback: this.typeLetter,
            callbackScope: this,
            loop: true
        });

        // this.input.on('pointerdown', () => {
        //     if (!this.finished) {
        //         this.textObject.setText(this.text);
        //         this.finished = true;
        //     } else {
        //         this.scene.start('ForestScene');
        //     }
        // });
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
                this.scene.start('DialogueScene4');
            });
        }
    }
}
