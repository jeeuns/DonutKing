class Victory extends Phaser.Scene {
    constructor() {
        super("winScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load any assets needed for the title screen, e.g., background image, buttons, etc.
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
        this.load.image('winScreen', 'winbg.png');

        this.load.audio('victoryMusic','victory.wav');
    }

    create() {

        this.add.image(720, 450, 'winScreen').setOrigin(0.5, 0.5).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // my.text.title = this.add.bitmapText(800, 300, "rocketSquare", "JERRY RUN");
        // my.text.title.setScale(2.0);

        //text
        this.add.text(1200, 350, "You Win", {
            fontFamily: 'Arial',
            fontSize: '128px',
            fontStyle: 'bold',
            fontWeight: 'bold',
            fill: 'black'
        }).setOrigin(0.5, 0.5); // Center the text

        let hoveringText = this.add.text(1200, 350, "You Win", {
            fontFamily: 'Arial',
            fontSize: '128px',
            fontStyle: 'bold',
            fontWeight: 'bold',
            fill: 'white'
        }).setOrigin(0.5, 0.5); // Center the text

        this.tweens.add({
            targets: hoveringText,
            y: hoveringText.y - 15 ,  // Amount to move up
            duration: 1000,         // Duration in milliseconds
            ease: 'Sine.easeInOut', // Easing function
            yoyo: true,             // Make it come back to the original position
            repeat: -1              // Repeat forever
        });

        this.add.text(1200, 410, 'Press SPACE to play again!', {
            fontFamily: 'Arial',
            fontSize: '32px',
            fontWeight: 'bold',
            fontStyle: 'bold',
            fill: 'white'
        }).setOrigin(0.5, 0.5);

        // Set up input to start the game
        this.input.keyboard.on('keydown-SPACE', () => {
            this.backgroundMusic.stop();
            this.scene.start('platformerScene');
        });

        this.input.on('pointerdown', () => {
            this.backgroundMusic.stop();
            this.scene.start('platformerScene');
        });

        // Play background music
        this.backgroundMusic = this.sound.add('victoryMusic');
        this.backgroundMusic.play({
            loop: false,
            volume: 0.4 // Adjust the volume level as needed (0.1 = 10% volume)
        });
    }

    update() {

    }
}
