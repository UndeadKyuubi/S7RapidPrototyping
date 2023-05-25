
class Stage extends Phaser.Scene {
    constructor() {
        super("stage")
    }
    
    init(data) {
        this.currentLevel = data.level;
    }

    create() {
        // player presses right to simulate win, left to simulate loss
        let up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        let left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        if (this.currentLevel == 1) {
            this.add.text(200, 400, "Watch out for slugs!");
        }
        else if (this.currentLevel == 2) {
            this.add.text(200, 400, "Watch out for snails!");
        }
        else {
            this.add.text(200, 400, "This is the last level!");
        }
        up.on('down', () => {
            this.scene.start('levelclear', {level: this.currentLevel + 1});
        });
        
        left.on('down', () => {
            this.scene.start('gameover')
        });
        let level = this.add.text(200, 100, "current level " + this.currentLevel);
        let gameplay = this.add.text(200, 300, "gameplay screen\npress left to lose; up to win");
    }

    update() {
        
    }
}

class GameOver extends Phaser.Scene {
    constructor() {
        super("gameover")
    }

    create() {
        this.add.text(400,300,"Game Over")
    }

    update() {
        
    }
}

class LevelClear extends Phaser.Scene {
    constructor() {
        super("levelclear")
    }

    init(data) {
        this.currentLevel = data.level;
    }

    create() {
        if (this.currentLevel == 2) {
            let text = this.add.text(200, 300, "That's good work!");
            this.input.on('pointerdown', () => {
                this.tweens.add({
                    targets: text,
                    x: 1000,
                    duration: 500,
                    ease: 'Cubic.in',
                    onComplete: () => {
                        this.time.delayedCall(250, () => {
                            this.scene.start('stage', {level:2})
                        });
                    }
                });
            });
        }
        else if (this.currentLevel == 3) {
            let text = this.add.text(200, 300, "Good job!");
            this.input.on('pointerdown', () => {
                this.tweens.add({
                    targets: text,
                    x: 1000,
                    duration: 500,
                    ease: 'Cubic.in',
                    onComplete: () => {
                        this.time.delayedCall(250, () => {
                            this.scene.start('stage' , {level:3})
                        });
                    }
                });
            });
        }
        else {
            let text = this.add.text(200, 300, "The roly poly gets a badge!");
            this.input.on('pointerdown', () => {
                this.tweens.add({
                    targets: text,
                    x: 1000,
                    duration: 500,
                    ease: 'Cubic.in',
                    onComplete: () => {
                        this.time.delayedCall(250, () => {
                            this.scene.start('winscreen')
                        });
                    }
                });
            });
        }
    }

    update() {
        
    }
}

class WinScreen extends Phaser.Scene {
    constructor() {
        super("winscreen")
    }

    create() {
        this.add.text(400,300,"You Win")
        this.add.text(400,400,"click to replay");
        this.input.on('pointerdown', () => this.scene.start('titlescreen'));
    }

    update() {
        
    }
}

class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titlescreen")
    }

    create() {
        this.add.text(400,300,"Roly Poly: To the End");
        this.add.text(400,400,"click to start");
        this.input.on('pointerdown', () => this.scene.start('stage', {level:1}));
    }

    update() {
        
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [TitleScreen, Stage, GameOver, LevelClear, WinScreen],
};

var game = new Phaser.Game(config);