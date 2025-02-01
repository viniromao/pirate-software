import PlayerData from "../components/PlayerData.js";

export default class DialogueScene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'DialogueScene3' });
    }

    preload() {
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.text = "Convince the King not to kill the royal chicken";
        this.displayText = '';
        this.textIndex = 0;
        this.textObject = this.add.text(centerX, centerY, '', { fontSize: '32px', fontFamily: 'MyCustomFont', fill: '#fff', wordWrap: { width: 400, useAdvancedWrap: true }, align: 'center' }).setOrigin(.5);
        this.clickSound = this.sound.add('clickSound');
        this.finished = false;
        this.soundPlaying = false;

        this.time.addEvent({
            delay: 80,
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
            this.time.delayedCall(5000, () => {
                this.scene.start('ForestScene');
            });
        }
    }
}
