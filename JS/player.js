class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.directionX = 0
        this.directionY = 0
        this.element = document.createElement("img")
        this.shoter = null

        this.element.src = imgSrc;
        this.element.style.position = `absolute`
        this.element.style.objectFit = `contain`
        this.element.style.width = `${width}px`
        this.element.style.height = `${height}px`
        this.element.style.left = `${left}px`
        this.element.style.top = `${top}px`

        this.gameScreen.appendChild(this.element)
    }

    move() {
        this.left += this.directionX

        if (this.left < 10) {
            this.left = 10
        }

        if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
            this.left = this.gameScreen.offsetWidth - this.width - 10
        }

        this.updatePosition()
    }

    shoot() {
        if (!this.shoter) {
            this.shoter = new Shoter(this.gameScreen, this)
        }
    }

    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect()
        const obstacleRect = obstacle.element.getBoundingClientRect()

        return playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }
}