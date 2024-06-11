class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 400;
        this.DRAG = 200;    // DRAG < ACCELERATION = icy slide
        //this.DRAG = 800;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500; //higher = smaller jump
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.5;
        this.SCORE = 0;

    }

    create() {
        
        this.load.setPath("./assets/");
        this.load.audio('coinpick', 'coinpick.flac');
        this.coinpick = this.sound.add('coinpick');

        this.load.image('enemy', 'enemy1.png');
        this.load.image('enemy1', 'enemy1-1.png');

        this.load.audio('bgmusic', 'bg.wav');

        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("platformer-level-1", 18, 18, 240, 45);

//------BACKGROUND PARALLAX-----------------------------------------------------------------
        this.bgLayer1 = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'background');
        this.bgLayer1.setScale(1.5)
        this.bgLayer1.setOrigin(0, 0);
        this.bgLayer1.setScrollFactor(0);

        this.bgLayer2 = this.add.tileSprite(0, 200, 0, 0, 'clouds');
        this.bgLayer2.setScale(0.5)
        this.bgLayer2.setOrigin(0, 0);
        this.bgLayer2.setScrollFactor(0);

//-----------LAYERS AND TILESHEET----------------------------------------
        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("kenny_tilemap_packed", "tilemap_tiles");
        this.tilesetFood = this.map.addTilesetImage("tilemap_packed_food","tilemap_tiles_food");
        this.tilesetFarm = this.map.addTilesetImage("tilemap_packed_farm","tilemap_tiles_farm");

        // // Create a layer
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);
        this.farmLayer = this.map.createLayer("Farm-n-Platforms", this.tilesetFarm, 0, 0);
        this.foodLayer = this.map.createLayer("Cake-n-Platforms", this.tilesetFood, 0, 0);
        
//-------Make it collidable-------------------------------------------
        //COLLISION PROPERTIES
        this.groundLayer.setCollisionByProperty({
            collides: true,
            water: true,
            flag: true
        });

        this.farmLayer.setCollisionByProperty({
            collides: true,
        });

        this.foodLayer.setCollisionByProperty({
            collides: true,
        });

    //--------------SCENE PROPERTY FOR COLLISION-----------------------------------

        this.groundLayer.setTileLocationCallback(0, 0, this.map.width, this.map.height, (sprite, tile) => {
            if (tile.properties.water) {
                this.backgroundMusic.stop();
                this.scene.start('deadScene');
            } else if (tile.properties.flag) {
                this.backgroundMusic.stop();
                this.scene.start('winScene');
            }
        }, this);

//-----------------COLLECTIBLE------------------------------------------------------------------
        this.donut = this.map.createFromObjects("Objects", {
            name: "donut",
            key: "tilemap_sheet_food",
            frame: 14
        });
        
        //frame 14 is the pink donut
        
        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.donut, Phaser.Physics.Arcade.STATIC_BODY);

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        // This will be used for collision detection below.
        this.donutGroup = this.add.group(this.donut);

        // set up player avatar x,y
        my.sprite.player = this.physics.add.sprite(this.map.widthInPixels/2, 2600, "player", "player.png");
        my.sprite.player.setCollideWorldBounds(true); //was originally true

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);
        this.physics.add.collider(my.sprite.player, this.farmLayer);
        this.physics.add.collider(my.sprite.player, this.foodLayer);

//-------END CONDITION FOR EATING THE PINK DONUT---------------------------------------------------------
        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.donutGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            this.coinpick.play();
            this.backgroundMusic.stop();
            this.scene.start('winScene');
        });
    
//------------KEYBOARD-------------------------------------------------------------------------------------------
        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        this.rKey = this.input.keyboard.addKey('R');

        this.input.keyboard.on('keydown-A', () => {
            my.sprite.player.setScale(2.0);
            my.sprite.player.setFlip(true);
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.anims.play('walk', true);
            // my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
            // my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
            if (my.sprite.player.body.blocked.down) {
                //my.vfx.walking.start();
            }
        }, this);

        this.input.keyboard.on('keyup-A', () => {
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            //my.vfx.walking.stop();
        }, this);

        this.input.keyboard.on('keydown-D', () => {
            my.sprite.player.setScale(2.0);
            my.sprite.player.setFlip(false);
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.anims.play('walk', true);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
            if (my.sprite.player.body.blocked.down) {
                my.vfx.walking.start();
            }
        }, this);

        this.input.keyboard.on('keyup-D', () => {
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            my.vfx.walking.stop();
        }, this);

        this.input.keyboard.on('keydown-W', () => {
            if (my.sprite.player.body.blocked.down) {
                my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
                my.sprite.player.anims.play('walk', true);
                my.vfx.jumping.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
                my.vfx.jumpinh.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
                this.jumpSound.play();
                if (my.sprite.player.body.blocked.down) {
                    my.vfx.jumping.start();
                }
            }
        }, this);

        this.input.keyboard.on('keydown-SPACE', () => {
            if (my.sprite.player.body.blocked.down) {
                my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
                my.sprite.player.anims.play('walk', true);
                my.vfx.jumping.startFollow(my.sprite.player, my.sprite.player.displayWidth / 2 - 10, my.sprite.player.displayHeight / 2 - 5, false);
                my.vfx.jumpinh.setParticleSpeed(this.PARTICLE_VELOCITY, 0);
                this.jumpSound.play();
                if (my.sprite.player.body.blocked.down) {
                    my.vfx.jumping.start();
                }
            }
        }, this);

//--------movement vfx---------------------------------------------------------------------------------------------

        //jump particle
        my.vfx.jumping = this.add.particles(0, 0, "kenny-particles", {
            frame: ['star_03.png', 'star_07.png'],
            scale: { start: 0.06, end: 0.1 },
            lifespan: 350,
            alpha: { start: 1, end: 0.1 },
        });
        my.vfx.jumping.stop();

//----------------------------------------------------------------------------------------------------------------
        //CAMERA MOVEMENT
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);
//--------AUDIO---------------------------------------------------------------------------------------------------
        //jump sound
        this.jumpSound = this.sound.add('jump');

        // Play background music
        this.backgroundMusic = this.sound.add('bgmusic');
        this.backgroundMusic.play({ loop: true });

//---------------ENEMY SET UP------------------------------------------
        // Enemy
        my.enemygroup = this.add.group({
            classType: Enemy,
            maxSize: 100,
            // activate update calls
            runChildUpdate: true,
        });

        my.enemySpawn = this.map.createFromObjects("Objects", {
            type: "enemSpawn",
            key: "enemy",
            frame: "enemy1",
        });

        my.enemySpawn.map((enemy) => {
            enemy.scale = SCALE;
            enemy.x *= SCALE;
            enemy.y *= SCALE;

            let newEnemy = new Enemy(this, enemy.x, enemy.y, "enemy", "enemy1.png");
            newEnemy.facing = enumList.LEFT;
            newEnemy.anims.play("enemy1");
            my.enemygroup.add(newEnemy);
            enemy.destroy(); // Refactor possibility
        });

        // enemy overlap
        this.physics.add.overlap(my.sprite.player, my.enemygroup, (obj1, obj2) => {
            // Push player away, first remove current momentum, and set flag
            if (!obj1.knockback) {
                obj1.body.setAccelerationX(0);
                obj1.knockback = true;
                obj1.setAngularVelocity(0);

                // Determine knockback vector
                if (obj1.x < obj2.x) {
                    obj1.body.setVelocity(-900, -600);
                } else {
                    obj1.body.setVelocity(900, -600);
                }

                // Give player a nudge to slow down a bit
                obj1.body.setDragX(this.DRAG);
                obj1.body.setAccelerationY(10);

                this.sound.play("bwah", { rate: 1.5, detune: 200 });

                // Either remove knockback after timer or on grounded
                this.time.delayedCall(475, () => {
                    my.sprite.player.knockback = false;
                });
            }
        });
//------Movement Instructions-----------------------------------------------------------------------------------------
        

    }

    update() {

//-------------------PARALLAX SCROLLING-----------------------------------------
        this.bgLayer1.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.bgLayer1.tilePositionY = this.cameras.main.scrollY * 0.3;

        this.bgLayer2.tilePositionX = this.cameras.main.scrollX * 0.5;
        this.bgLayer2.tilePositionY = this.cameras.main.scrollY * 0.5;

        // --------------Player jump-------------------------------------------

        if (!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
            my.sprite.player.setScale(2.0);
            my.vfx.jumping.start();
        } else {
            my.vfx.jumping.stop();
        }
        // -------------GAME RESET ---------------------------------------------
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.backgroundMusic.stop();
            this.scene.restart();
        }

    }

}