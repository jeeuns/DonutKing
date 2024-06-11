class GameOver extends Phaser.Scene {
    constructor() {
        super("deadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load any assets needed for the title screen, e.g., background image, buttons, etc.
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
        this.load.image('loss', 'deadbg.png');

        this.load.audio('gameover','gameover.wav');

    }

    create() {

        this.add.image(720, 450, 'loss').setOrigin(0.5, 0.5).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // my.text.title = this.add.bitmapText(800, 300, "rocketSquare", "JERRY RUN");
        // my.text.title.setScale(2.0);

        //text
        let hoveringText = this.add.text(720, 250, "YOU LOST!", {
            fontFamily: 'Arial',
            fontSize: '164px',
            fontStyle: 'bold',
            fontWeight: 'bold',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5); // Center the text

        this.tweens.add({
            targets: hoveringText,
            y: hoveringText.y - 20,  // Amount to move up
            duration: 1000,         // Duration in milliseconds
            ease: 'Sine.easeInOut', // Easing function
            yoyo: true,             // Make it come back to the original position
            repeat: -1              // Repeat forever
        });

        this.add.text(720, 380, 'Press SPACE to play again.', {
            fontFamily: 'Arial',
            fontSize: '48px',
            fontWeight: 'bold',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Set up input to start the game
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('platformerScene');
        });

        this.input.on('pointerdown', () => {
            this.scene.start('platformerScene');
        });

        // Play background music
        this.backgroundMusic = this.sound.add('gameover');
        this.backgroundMusic.play({ loop: false });

    }
    
    update() {

    }
}
