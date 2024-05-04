class Game {
    constructor() {
        this.startScreen = document.getElementById(`game-intro`)
        this.gameScreen = document.getElementById(`game-screen`)
        this.gameEndScreen = document.getElementById(`game-end`)
        this.Player = new Player(
            this.gameScreen,
            200,
            500,
            100,
            150,
            `./Images/pj.png`
        )


        this.height = 600
        this.width = 500
        this.obstacles = []
        this.score = 0
        this.lives = 5
        this.gameIsOver = false
        this.gameIntervalId = null
        this.gameLoopFrequency = 1000 / 60
    }

    start() {
        this.gameScreen.style.height = `${this.height}px`
        this.gameScreen.style.width = `${this.width}px`

        this.startScreen.style.display = `none`
        this.gameScreen.style.display = `block`

        this.gameIntervalId = setInterval(() => this.gameLoop(), this.gameLoopFrequency)
        this.startObstacles();
    }

    startObstacles() {
        const obstacleInterval = setInterval(() => {
            if (this.obstacles.length < 3) {
                const newObstacle = new Obstacles(this.gameScreen)
                this.obstacles.push(newObstacle)
                if (this.obstacles.length === 3) {
                    clearInterval(obstacleInterval)
                }
            }
        }, 2000)
    }

    gameLoop() {
        this.update()

        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
        }
    }

    update() {
        this.Player.move();

        document.getElementById('score').textContent = this.score;
        document.getElementById('lives').textContent = this.lives

        this.obstacles.forEach((obstacle, index) => {
            obstacle.move();

            if (this.Player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.lives--;
                this.obstacles.splice(index, 1);
            }

            if (obstacle.top + obstacle.height > this.height) {
                obstacle.velocity = -1;
            }

            if (obstacle.top < 0) {
                obstacle.velocity = 1;
            }

            if (obstacle.left + obstacle.width > this.width) {
                obstacle.velocityX = -1;
            }

            if (obstacle.left < 0) {
                obstacle.velocityX = 1;
            }
        });


        if (this.Player.shoter) {
            this.Player.shoter.move();
            this.obstacles.forEach((obstacle, index) => {
                if (this.Player.shoter && this.Player.shoter.element) {
                    if (this.Player.shoter.element.getBoundingClientRect().top < 0) {
                        this.Player.shoter.destroy();
                        this.Player.shoter = null;
                    } else if (this.Player.shoter.didCollide(obstacle)) {
                        obstacle.element.remove();
                        this.obstacles.splice(index, 1);
                        this.Player.shoter.destroy();
                        this.Player.shoter = null;
                        this.score += 10;
                        console.log('Score:', this.score);
                    }
                }
            });
        }


        if (this.Player.shoter && this.Player.shoter.element.getBoundingClientRect().top < 0) {
            this.Player.shoter.destroy();
            this.Player.shoter = null;
        }

        if (this.lives === 0) {
            this.endGame();
        }

        if (this.score === 100) {
            this.gameEndScreen.querySelector('#end-message').innerText = 'You win!'
            this.endGame()
        }

        if (Math.random() > 0.98 && this.obstacles.length < 3) {
            this.obstacles.push(new Obstacles(this.gameScreen))
        }
    }

    endGame() {
        this.Player.element.remove()
        this.obstacles.forEach(obstacle => obstacle.element.remove())

        this.gameIsOver = true
        this.gameScreen.style.display = `none`
        this.gameEndScreen.style.display = `block`
    }
}