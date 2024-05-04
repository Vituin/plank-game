class Obstacles {
    constructor(gameScreen) {
        this.gameScreen = gameScreen
        this.left = Math.floor(Math.random() * 300 + 70)
        this.top = 0
        this.width = 60
        this.height = 85
        this.velocity = 1
        this.velocityX = 1;
        this.element = document.createElement('img')
        this.element.src = './Images/rombo.png'
        this.element.style.position = 'absolute'
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
        this.gameScreen.appendChild(this.element)
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`
        this.element.style.top = `${this.top}px`
    }

    move() {
        this.top += this.velocity
        this.left += this.velocityX
        this.updatePosition()
    }
}