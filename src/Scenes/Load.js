class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");

        this.load.image('background', 'background.png');
        this.load.image('clouds', 'clouds.png');

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");
        this.load.image('player','player.png');
        this.load.image('player1','player1.png');

        // Load enemies
        this.load.image('enemy', 'enemy1.png');
        this.load.image('enemy1', 'enemy1-1.png');

        //water
        this.load.image('water1', 'water1.png');
        this.load.image('water2', 'water2.png');

        //font
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");

        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");                         // Packed tilemap
        this.load.image("tilemap_tiles_food", "tilemap_packed_food.png");
        this.load.image("tilemap_tiles_farm", "tilemap_packed_farm.png");
        this.load.tilemapTiledJSON("platformer-level-1", "platformer-level-1.tmj");   // Tilemap in JSON

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        this.load.spritesheet("tilemap_sheet_food", "tilemap_packed_food.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        
        //audio
        this.load.audio('bgmusic', 'bg.wav');
        this.load.audio('coinpick', 'coinpick.flac');
        this.load.audio('jump', 'jump.flac');
        this.load.audio('victoryMusic', 'victory.wav');

        // Oooh, fancy. A multi atlas is a texture atlas which has the textures spread
        // across multiple png files, so as to keep their size small for use with
        // lower resource devices (like mobile phones).
        // kenny-particles.json internally has a list of the png files
        // The multiatlas was created using TexturePacker and the Kenny
        // Particle Pack asset pack.
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {

        //player animations

        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'player' },
                { key: 'player1' }
            ],
            frameRate: 15,
            repeat: -1
        });
        

        this.anims.create({
            key: 'idle',
            frames: [
                { key: 'player' }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [
                { key: 'player1' }
            ],
        });

        this.anims.create({
            key: 'water',
            frames: [
                { key: 'water1' },
                { key: 'water2' }
            ],
            frameRate: 8,
            repeat: -1
        });

        //enemy animations
        this.anims.create({
            key: 'enemy1',
            frames: [
                { key: 'enemy.png' },
                { key: 'enemy1.png' }
            ],
        });

         // ...and pass to the next Scene
         this.scene.start("startScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}