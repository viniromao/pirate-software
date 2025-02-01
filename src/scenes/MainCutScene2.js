import GlobalAudio from "../components/GlobalAudio.js";

export default class MainCutScene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'MainCutScene2' });
    }

    preload() {
    }

    create() {

        this.backgroundImage = 'scene2';

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

        this.soldierTalk();

        this.input.on('pointerdown', () => {
            this.scene.start('MainCutScene3');
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

    kingTalk(){
        this.text = "King: \nExcellent! Now, my\n faithful knights, I order\n you to slay it and\n send it to the cook!";
        this.displayText = '';
        this.textIndex = 0;
        this.textObject = this.add.text(50, 50, '', { fontSize: '32px', fontFamily: 'MyCustomFont', fill: '#fff', wordWrap: { width: 400, useAdvancedWrap: true }, backgroundColor: '#000000' });
        this.clickSound = this.sound.add('clickSound');
        this.finished = false;
        this.soundPlaying = false;
        this.callback = () => {this.scene.start('MainCutScene3'); }


        this.time.addEvent({
            delay: 1000,
            callback: this.typeLetter,
            callbackScope: this,
            loop: true
        });
    }

    soldierTalk() {
        this.text = "Knight: \nYour Majesty, we have\n found the chicken!\n It is... very fluffy!";
        this.displayText = '';
        this.textIndex = 0;
        this.textObject = this.add.text(150, 150, '', { fontSize: '32px', fontFamily: 'MyCustomFont', fill: '#fff', wordWrap: { width: 400, useAdvancedWrap: true }, backgroundColor: '#000000' });
        this.clickSound = this.sound.add('clickSound');
        this.finished = false;
        this.soundPlaying = false;
        
        this.callback = this.kingTalk

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