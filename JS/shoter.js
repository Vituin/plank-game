class Shoter {
    constructor(gameScreen, player) {
        this.gameScreen = gameScreen
        this.player = player
        this.width = 10
        this.height = 10
        this.speed = 5
        this.element = document.createElement('div')
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.backgroundColor = 'red'
        this.element.style.left = `${player.left + (player.width / 2) - (this.width / 2)}px`
        this.element.style.top = `${player.top}px`
        this.gameScreen.appendChild(this.element)
        // this.setPosition()
    }

    // setPosition() {
    //     const playerRect = this.player.element.getBoundingClientRect()
    //     // const playerX = playerRect.left + (playerRect.width / 2) - (this.width / 2)
    //     const playerX = playerRect.left;
    //     const playerY = playerRect.top
    //     this.element.style.left = `${playerX}px`
    //     this.element.style.top = `${playerY}px`
    // }

    move() {
        this.element.style.top = `${parseInt(this.element.style.top) - this.speed}px`
    }

    destroy() {
        this.element.remove()
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect()
        const obstacleRect = obstacle.element.getBoundingClientRect()

        return playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
    }
}