window.onload = function () {
    const startButton = document.querySelector("#start-button")
    const restartButton = document.querySelector("#restart-button")
    let game

    startButton.addEventListener("click", function () {
        console.log('starting...')
        startGame()
    });

    restartButton.addEventListener("click", function () {
        restartGame()
    });

    function startGame() {
        console.log("start game")
        game = new Game()
        game.start()
        console.log(`run`)
    }

    function restartGame() {
        location.reload()
        console.log(`restart`)
    }

    function handleKeydown(event) {
        const key = event.key
        console.log(`move`)

        switch (key) {
            case "a":
                console.log(`left`)
                game.Player.directionX = -1
                break
            case "d":
                console.log(`right`)
                game.Player.directionX = 1
                break
            case "Enter":
                console.log(`shoot`)
                game.Player.shoot()
                break
        }
    }

    function handleKeyup(event) {
        const key = event.key
        console.log(`stop`)

        switch (key) {
            case "a":
            case "d":
                game.Player.directionX = 0
                break
        }
    }

    window.addEventListener(`keydown`, handleKeydown)
    window.addEventListener('keyup', handleKeyup)
}