class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    preload() {
        this.load.setPath("./assets/");

        // Load any assets needed for the title screen, e.g., background image, buttons, etc.
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");
        this.load.image('titlescreen', 'title.png');
    }

    create() {

        this.add.image(720, 450, 'titlescreen').setOrigin(0.5, 0.5).setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // my.text.title = this.add.bitmapText(800, 300, "rocketSquare", "JERRY RUN");
        // my.text.title.setScale(2.0);

        //text
        this.add.text(1000, 180, "DONUT KING", {
            fontFamily: 'Arial',
            fontSize: '128px',
            fontStyle: 'bold',
            fontWeight: 'bold',
            fill: '#00000'
        }).setOrigin(0.5, 0.5); // Center the text

        let hoveringText = this.add.text(1000, 180, "DONUT KING", {
            fontFamily: 'Arial',
            fontSize: '128px',
            fontStyle: 'bold',
            fontWeight: 'bold',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5); // Center the text

        this.add.text(1000, 270, "by Regina Kim", {
            fontFamily: 'Arial',
            fontSize: '64px',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5); // Center the text

        this.add.text(750, 800, '[SPACE] to Start', {
            fontFamily: 'Arial',
            fontSize: '64px',
            fontStyle: 'bold',
            fontWeight: 'bold',
            fill: '#00000'
        }).setOrigin(0.5, 0.5); // Center the text

        let hoveringText2 = this.add.text(750, 800, '[SPACE] to Start', {
            fontFamily: 'Arial',
            fontSize: '64px',
            fontStyle: 'bold',
            fontWeight: 'bold',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        //animation
        this.tweens.add({
            targets: hoveringText,
            y: hoveringText.y - 20,  // Amount to move up
            duration: 1000,         // Duration in milliseconds
            ease: 'Sine.easeInOut', // Easing function
            yoyo: true,             // Make it come back to the original position
            repeat: -1              // Repeat forever
        });

        this.tweens.add({
            targets: hoveringText2,
            y: hoveringText2.y - 5,  // Amount to move up
            duration: 1000,         // Duration in milliseconds
            ease: 'Sine.easeInOut', // Easing function
            yoyo: true,             // Make it come back to the original position
            repeat: -1              // Repeat forever
        });

        // Set up input to start the game
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('platformerScene');
        });

        this.input.on('pointerdown', () => {
            this.scene.start('platformerScene');
        });
    }

    update() {

    }
}
